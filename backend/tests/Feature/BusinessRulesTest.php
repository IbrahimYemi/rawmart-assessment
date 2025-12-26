<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Services\Auth\AuthService;
use App\Services\FileService;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;

class BusinessRulesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function user_email_must_be_unique()
    {
        $user1 = User::factory()->create(['email' => 'ibrahim@example.com']);

        $this->expectException(\Illuminate\Database\QueryException::class);

        User::factory()->create(['email' => 'ibrahim@example.com']);
    }

    #[Test]
    public function password_is_hashed_on_registration()
    {
        $fileService = $this->createMock(FileService::class);
        $fileService->method('upload')->willReturn('dummy.jpg');

        $authService = new AuthService($fileService);

        $data = [
            'name' => 'Ibrahim',
            'email' => 'ibrahim@example.com',
            'password' => 'plain-password',
        ];

        $result = $authService->register($data);

        $this->assertTrue(Hash::check('plain-password', $result['user']->password));
    }

    #[Test]
    public function comment_must_belong_to_post_and_user()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'text' => 'Business logic test',
        ]);

        $this->assertEquals($user->id, $comment->user_id);
        $this->assertEquals($post->id, $comment->post_id);
    }

    #[Test]
    public function user_cannot_delete_post_they_do_not_own()
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $post = Post::factory()->create(['user_id' => $owner->id]);

        $this->actingAs($intruder, 'api');
        $response = $this->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(403);
    }
}