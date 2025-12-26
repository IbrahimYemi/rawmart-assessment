<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function user_can_logout_and_token_becomes_invalid()
    {
        $headers = $this->authenticate();

        $this->postJson('/api/auth/logout', [], $headers)
            ->assertStatus(200);

        $this->postJson('/api/user/profile', [], $headers)
            ->assertStatus(401);
    }
}
