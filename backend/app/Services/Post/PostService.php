<?php

namespace App\Services\Post;

use App\Models\Post;
use App\Services\FileService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PostService
{
    protected FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function feeds(?string $q = null, ?string $tag = null, string $sort = 'newest', int $perPage = 10)
    {
        return $this->buildBaseQuery()
            ->when($q, fn($query) => $this->applySearch($query, $q))
            ->when($tag && $tag !== 'All', fn($query) => $this->applyTagFilter($query, $tag))
            ->orderBy('created_at', $sort === 'oldest' ? 'asc' : 'desc')
            ->paginate($perPage);
    }

    public function personal(?string $q = null, ?string $tag = null, string $sort = 'newest', int $perPage = 10)
    {
        return $this->buildBaseQuery()
            ->ownedBy(auth()->id())
            ->when($q, fn($query) => $this->applySearch($query, $q))
            ->when($tag && $tag !== 'All', fn($query) => $this->applyTagFilter($query, $tag))
            ->orderBy('created_at', $sort === 'oldest' ? 'asc' : 'desc')
            ->paginate($perPage);
    }
    
    protected function buildBaseQuery()
    {
        return Post::query()
            ->with(['user:id,name,image', 'tags'])
            ->withCount('comments');
    }
    
    protected function applySearch($query, $q)
    {
        return $query->where(function ($sub) use ($q) {
            $sub->where('title', 'like', "%{$q}%")
                ->orWhere('body', 'like', "%{$q}%")
                ->orWhereHas('tags', fn($tagQuery) => $tagQuery->where('name', 'like', "%{$q}%"));
        });
    }
    
    protected function applyTagFilter($query, $tag)
    {
        return $query->whereHas('tags', fn($sub) => $sub->where('name', $tag));
    }
    
    public function show(Post $post): Post
    {
        return $post->load(['user:id,name,image', 'comments.user:id,name,image']);
    }
    
   public function create(array $data): Post
    {
        return DB::transaction(function () use ($data) {

            $post = Post::create([
                'user_id'    => auth()->id(),
                'title'      => $data['title'],
                'content'    => $data['content'],
                'expires_at' => now()->addHours(24),
            ]);

            if (!empty($data['tags'])) {
                $tags = collect($data['tags'])
                    ->map(fn ($tag) => ['name' => strtolower($tag)])
                    ->unique('name')
                    ->values()
                    ->all();

                $post->tags()->createMany($tags);
            }

            return $post->load('tags');
        });
    }
    
    public function update(Post $post, array $data): Post
    {
        $this->authorize('update', $post);
        return DB::transaction(function () use ($data, $post) {

            $post->update($data);

            return $this->updateTag($post, $data['tags']);
        });
    }
    
    public function updateTag(Post $post, array $data): Post
    {
        return DB::transaction(function () use ($data, $post) {

            if (!empty($data['tags'])) {
                $post->tags()->delete();

                $tags = collect($data['tags'])
                    ->map(fn ($tag) => ['name' => strtolower($tag)])
                    ->unique('name')
                    ->values()
                    ->all();

                $post->tags()->createMany($tags);
            }

            return $post->fresh()->load('tags');
        });
    }
    
    public function delete(Post $post): bool
    {
        $this->authorize('delete', $post);

        return $post->delete();
    }

    protected function authorize(string $ability, Post $post = null): void
    {
        Gate::authorize($ability, $post);
    }
}
