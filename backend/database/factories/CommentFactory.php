<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommentFactory extends Factory
{

    public function definition(): array
    {
        return [
            'id'      => Str::uuid(),
            'user_id' => User::factory(),
            'post_id' => Post::factory(),
            'text'    => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}