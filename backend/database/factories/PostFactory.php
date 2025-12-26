<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{

    public function definition(): array
    {
        $createdAt = now();

        return [
            'id'         => Str::uuid(),
            'user_id'    => User::factory(),
            'title'      => $this->faker->sentence(6),
            'content'    => $this->faker->paragraphs(3, true),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
            'expires_at' => (clone $createdAt)->modify('+24 hours'),
            'deleted_at' => null,
        ];
    }

    /**
     * State for expired posts
     * Post::factory()->expired()->create();
     */
    public function expired(): Factory
    {
        return $this->state(function () {
            $createdAt = now();

            return [
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
                'expires_at' => (clone $createdAt)->modify('-24 hours'),
            ];
        });
    }
}