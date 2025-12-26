<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function authenticate($user = null)
    {
        $user = $user ?? User::factory()->create();

        $token = auth('api')->login($user);

        return [
            'Authorization' => "Bearer {$token}",
        ];
    }

    protected function setUp(): void
    {
        parent::setUp();
    }

}
