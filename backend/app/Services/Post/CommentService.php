<?php

namespace App\Services\Post;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CommentService
{
    public function create(Post $post, array $data): Comment
    {
        return DB::transaction(function () use ($post, $data) {

            return $post->comments()->create([
                'user_id' => auth()->id(),
                'text' => $data['text'],
            ]);
        });
    }

    public function update(Comment $comment, array $data): Comment
    {
        $this->authorize('update', $comment);

        $comment->update([
            'text' => $data['text'],
        ]);

        return $comment->fresh(['user']);
    }

    public function delete(Comment $comment): void
    {
        $this->authorize('delete', $comment);

        $comment->delete();
    }

    protected function authorize(string $ability, Comment $comment = null): void
    {
        Gate::authorize($ability, $comment);
    }
}
