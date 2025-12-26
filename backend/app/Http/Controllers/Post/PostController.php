<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\Post\PostService;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Posts",
 *     description="Post management endpoints"
 * )
 */
class PostController extends Controller
{
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * @OA\Get(
     *   path="/api/posts/feeds",
     *   tags={"Posts"},
     *   summary="Get public feeds",
     *   @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
     *   @OA\Parameter(name="per_page", in="query", required=false, @OA\Schema(type="integer", default=10)),
     *   @OA\Response(
     *     response=200,
     *     description="Paginated list of posts",
     *     @OA\JsonContent(ref="#/components/schemas/PaginatedPosts")
     *   )
     * )
     */
    public function feeds(Request $request)
    {
       return $this->paginatedResponse(
            $this->postService->feeds(
                $request->query('q'), 
                $request->query('tag'), 
                $request->query('sort', 'newest'), 
                $request->query('per_page', 9)
            ),
            'Feeds retrieved',
            PostResource::class
        );
    }

    /**
     * @OA\Get(
     *   path="/api/posts/personal",
     *   tags={"Posts"},
     *   security={{"bearerAuth":{}}},
     *   summary="Get personal posts",
     *   @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
     *   @OA\Parameter(name="per_page", in="query", required=false, @OA\Schema(type="integer", default=10)),
     *   @OA\Response(
     *     response=200,
     *     description="Paginated list of personal posts",
     *     @OA\JsonContent(ref="#/components/schemas/PaginatedPosts")
     *   )
     * )
     */
    public function personal(Request $request)
    {
       return $this->paginatedResponse(
            $this->postService->personal(
                $request->query('q'), 
                $request->query('tag'), 
                $request->query('sort', 'newest'), 
                $request->query('per_page', 9)
            ),
            'personal Feeds retrieved',
            PostResource::class
        );
    }

    /**
     * @OA\Get(
     *   path="/api/posts/{postId}",
     *   tags={"Posts"},
     *   summary="Get a single post",
     *   @OA\Parameter(
     *     name="postId",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Post details",
     *     @OA\JsonContent(ref="#/components/schemas/Post")
     *   ),
     *   @OA\Response(response=404, description="Post not found")
     * )
     */
    public function show(Post $post)
    {
        return $this->successResponse(
            PostResource::make($this->postService->show($post))
        );
    }

    /**
     * @OA\Post(
     *   path="/api/posts",
     *   tags={"Posts"},
     *   security={{"bearerAuth":{}}},
     *   summary="Create a new post",
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"title","content","tags"},
     *       @OA\Property(property="title", type="string", example="The Future of React 19"),
     *       @OA\Property(property="content", type="string", example="Exploring the new compiler and actions API..."),
     *       @OA\Property(
     *         property="tags",
     *         type="array",
     *         @OA\Items(type="string", example="react")
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=201,
     *     description="Post created",
     *     @OA\JsonContent(ref="#/components/schemas/Post")
     *   ),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();

        return $this->successResponse(
            PostResource::make($this->postService->create($validated)),
            'Post created successfully', 201
        );
    }

    /**
     * @OA\Put(
     *   path="/api/posts/{postId}",
     *   tags={"Posts"},
     *   security={{"bearerAuth":{}}},
     *   summary="Update a post",
     *   @OA\Parameter(
     *     name="postId",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       @OA\Property(property="title", type="string", example="Updated title"),
     *       @OA\Property(property="content", type="string", example="Updated content"),
     *       @OA\Property(
     *         property="tags",
     *         type="array",
     *         @OA\Items(type="string", example="frontend")
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Post updated",
     *     @OA\JsonContent(ref="#/components/schemas/Post")
     *   ),
     *   @OA\Response(response=404, description="Post not found"),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();

        return $this->successResponse(
            PostResource::make($this->postService->update($post, $validated)),
            'Post updated'
        );
    }

    /**
     * @OA\Put(
     *   path="/api/posts/{postId}/update-tags",
     *   tags={"Posts"},
     *   security={{"bearerAuth":{}}},
     *   summary="Update a post tag by any user",
     *   @OA\Parameter(
     *     name="postId",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="tags",
     *         type="array",
     *         @OA\Items(type="string", example="frontend")
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Post updated",
     *     @OA\JsonContent(ref="#/components/schemas/Post")
     *   ),
     *   @OA\Response(response=404, description="Post not found"),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function updateTag(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();

        return $this->successResponse(
            PostResource::make($this->postService->updateTag($post, $validated)),
            'Post tags updated'
        );
    }

    /**
     * @OA\Delete(
     *   path="/api/posts/{postId}",
     *   tags={"Posts"},
     *   security={{"bearerAuth":{}}},
     *   summary="Delete a post",
     *   @OA\Parameter(
     *     name="postId",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Post deleted",
     *     @OA\JsonContent(
     *       @OA\Property(property="success", type="boolean", example=true),
     *       @OA\Property(property="message", type="string", example="Post deleted")
     *     )
     *   ),
     *   @OA\Response(response=404, description="Post not found")
     * )
     */
    public function destroy(Post $post)
    {
        $this->postService->delete($post);

        return $this->messageResponse('Post deleted');
    }
}