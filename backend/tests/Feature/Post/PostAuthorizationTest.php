<?php

namespace Tests\Feature\Post;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use PHPUnit\Framework\Attributes\Test;

class PostAuthorizationTest extends TestCase
{
    #[Test]
    public function guest_cannot_create_post()
    {
        $response = $this->postJson('/api/posts', [
            'title' => 'Test Post',
            'body' => 'Content',
        ]);

        $response->assertStatus(401);
    }

    #[Test]
    public function authenticated_user_can_create_post()
    {
        $user = User::factory()->create();

        $headers = $this->authenticate($user);

        $response = $this
            ->actingAs($user)
            ->postJson('/api/posts', [
                'title' => 'Test Post',
                'content' => 'Post body',
                'tags'  => ['test'],
            ], $headers);

        $response->assertStatus(201);

        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'user_id' => $user->id,
        ]);
    }

    #[Test]
    public function user_cannot_delete_post_they_do_not_own()
    {
        $headers = $this->authenticate();

        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $post = Post::factory()->create([
            'user_id' => $owner->id,
        ]);

        $response = $this
            ->actingAs($intruder)
            ->deleteJson("/api/posts/{$post->id}", [], $headers);

        $response->assertStatus(403);
    }
}
