<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;


class UnauthorizedAccessTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function unauthenticated_user_cannot_access_profile()
    {
        $response = $this->postJson('/api/user/profile');

        $response->assertStatus(401);
    }

    #[Test]
    public function unauthenticated_user_cannot_change_password()
    {
        $response = $this->postJson('/api/user/change-password', [
            'current_password' => 'old',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
        ]);

        $response->assertStatus(401);
    }

    #[Test]
    public function unauthenticated_user_cannot_create_post()
    {
        $response = $this->postJson('/api/posts', [
            'title' => 'Test',
            'content' => 'Content',
        ]);

        $response->assertStatus(401);
    }
}
