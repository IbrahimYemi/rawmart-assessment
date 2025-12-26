<?php

namespace App\Http\Controllers\Post;

use App\Exceptions\BadRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Post;
use App\Models\Comment;
use App\Services\Post\CommentService;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Comments",
 *     description="Post comments management"
 * )
 */
class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    /**
     * @OA\Post(
     *   path="/api/posts/{post}/comments",
     *   tags={"Comments"},
     *   security={{"bearerAuth":{}}},
     *   summary="Add comment to a post",
     *   @OA\Parameter(
     *     name="post",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"text"},
     *       @OA\Property(property="text", type="string", example="Nice post!")
     *     )
     *   ),
     *   @OA\Response(
     *     response=201,
     *     description="Comment created",
     *     @OA\JsonContent(ref="#/components/schemas/Comment")
     *   ),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(PostCommentRequest $request, Post $post)
    {
        $validated = $request->validated();

        $comment = $this->commentService->create($post, $validated);

        return $this->successResponse(CommentResource::make($comment), 'Comment added', 201);
    }

    /**
     * @OA\Put(
     *   path="/api/posts/{post}/comments/{commentId}",
     *   tags={"Comments"},
     *   security={{"bearerAuth":{}}},
     *   summary="Update a comment",
     *   @OA\Parameter(
     *     name="post",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\Parameter(
     *     name="comment",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"text"},
     *       @OA\Property(property="text", type="string", example="Nice post!")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Comment updated",
     *     @OA\JsonContent(ref="#/components/schemas/Comment")
     *   ),
     *   @OA\Response(response=404, description="Comment not found"),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(PostCommentRequest $request, Post $post, Comment $comment)
    {
        $this->avoidHyjacking($post, $comment);

        $validated = $request->validated();

        $comment = $this->commentService->update($comment, $validated);

        return $this->successResponse(CommentResource::make($comment), 'Comment updated');
    }

    /**
     * @OA\Delete(
     *   path="/api/posts/{post}/comments/{commentId}",
     *   tags={"Comments"},
     *   security={{"bearerAuth":{}}},
     *   summary="Delete a comment",
     *   @OA\Parameter(
     *     name="post",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\Parameter(
     *     name="comment",
     *     in="path",
     *     required=true,
     *     @OA\Schema(type="string")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Comment deleted",
     *     @OA\JsonContent(
     *       @OA\Property(property="success", type="boolean", example=true),
     *       @OA\Property(property="message", type="string", example="Comment deleted")
     *     )
     *   ),
     *   @OA\Response(response=404, description="Comment not found")
     * )
     */
    public function destroy(Post $post, Comment $comment)
    {
        $this->avoidHyjacking($post, $comment);

        $this->commentService->delete($comment);

        return $this->messageResponse('Comment deleted');
    }

    protected function avoidHyjacking(Post $post, Comment $comment)
    {
        if ($comment->post_id !== $post->id) {
            throw new BadRequestException('Unauthorized action');
        }
    }
}
