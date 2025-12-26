<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class AuthenticatedAccessTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function authenticated_user_can_access_profile()
    {
        $headers = $this->authenticate();

        $response = $this->postJson('/api/user/profile', [], $headers);

        $response->assertStatus(200);
    }
}
