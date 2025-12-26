<?php

namespace Tests\Feature\Post;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $otherUser;
    protected $post;
    protected $headers;
    protected $otherHeaders;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();
        $this->post = Post::factory()->create(['user_id' => $this->otherUser->id]);
        $this->headers = $this->authenticate($this->user);
        $this->otherHeaders = $this->authenticate( $this->otherUser);
    }

    #[Test]
    public function authenticated_user_can_add_comment()
    {
        $payload = ['text' => 'Nice post!'];

        $response = $this->actingAs($this->user, 'api')
                         ->postJson("/api/posts/{$this->post->id}/comments", $payload, $this->headers);

        $response->assertStatus(201)
                 ->assertJsonFragment(['text' => 'Nice post!']);

        $this->assertDatabaseHas('comments', ['text' => 'Nice post!', 'user_id' => $this->user->id]);
    }

    #[Test]
    public function user_can_update_own_comment()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id, 'user_id' => $this->user->id]);

        $payload = ['text' => 'Updated Comment'];

        $response = $this->actingAs($this->user, 'api')
                         ->putJson("/api/posts/{$this->post->id}/comments/{$comment->id}", $payload, $this->headers);

        $response->assertStatus(200)
                 ->assertJsonFragment(['text' => 'Updated Comment']);
    }

    #[Test]
    public function user_cannot_update_others_comment()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id, 'user_id' => $this->otherUser->id]);

        $payload = ['text' => 'Hacked Comment'];

        $response = $this->actingAs($this->user, 'api')
                         ->putJson("/api/posts/{$this->post->id}/comments/{$comment->id}", $payload, $this->otherHeaders);

        $response->assertStatus(403);
    }

    #[Test]
    public function user_can_delete_own_comment()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id, 'user_id' => $this->user->id]);

        $response = $this->actingAs($this->user, 'api')
                         ->deleteJson("/api/posts/{$this->post->id}/comments/{$comment->id}", [], $this->headers);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    #[Test]
    public function user_cannot_delete_others_comment()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id, 'user_id' => $this->otherUser->id]);

        $response = $this->actingAs($this->user, 'api')
                         ->deleteJson("/api/posts/{$this->post->id}/comments/{$comment->id}", [], $this->otherHeaders);

        $response->assertStatus(403);
    }
}
