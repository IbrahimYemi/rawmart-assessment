<?php

namespace Tests\Feature\Post;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $otherUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();
    }

    #[Test]
    public function authenticated_user_can_create_post()
    {
        $headers = $this->authenticate($this->user);

        $payload = [
            'title' => 'My First Post',
            'content' => 'Post content here',
            'tags'  => ['test'],
        ];

        $response = $this->actingAs($this->user, 'api')->postJson('/api/posts', $payload, $headers);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'My First Post']);

        $this->assertDatabaseHas('posts', ['title' => 'My First Post', 'user_id' => $this->user->id]);
    }

    #[Test]
    public function guest_cannot_create_post()
    {
        $payload = [
            'title' => 'Test', 
            'content' => 'Test content',
            'tags'  => ['test'],
        ];

        $response = $this->postJson('/api/posts', $payload);

        $response->assertStatus(401);
    }

    #[Test]
    public function user_can_update_own_post()
    {
        $headers = $this->authenticate($this->user);
        
        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $payload = ['title' => 'Updated Title'];

        $response = $this->actingAs($this->user, 'api')->putJson("/api/posts/{$post->id}", $payload, $headers);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Updated Title']);

        $this->assertDatabaseHas('posts', ['id' => $post->id, 'title' => 'Updated Title']);
    }

    #[Test]
    public function user_cannot_update_others_post()
    {
        $otherHeaders = $this->authenticate( $this->otherUser);

        $post = Post::factory()->create(['user_id' => $this->otherUser->id]);
        $payload = ['title' => 'Hacked Title'];

        $response = $this->actingAs($this->user, 'api')->putJson("/api/posts/{$post->id}", $payload, $otherHeaders);

        $response->assertStatus(403);
    }

    #[Test]
    public function user_can_delete_own_post()
    {
        $headers = $this->authenticate($this->user);

        $post = Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user, 'api')->deleteJson("/api/posts/{$post->id}", [], $headers);

        $response->assertStatus(200);
        $this->assertSoftDeleted('posts', ['id' => $post->id]);
    }

    #[Test]
    public function user_cannot_delete_others_post()
    {
        $otherHeaders = $this->authenticate( $this->otherUser);

        $post = Post::factory()->create(['user_id' => $this->otherUser->id]);

        $response = $this->actingAs($this->user, 'api')->deleteJson("/api/posts/{$post->id}",[], $otherHeaders);

        $response->assertStatus(403);
    }
}
