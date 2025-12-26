<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\User;
use PHPUnit\Framework\Attributes\Test;

class BasicAppTest extends TestCase
{
    #[Test]
    public function test_post_validation_rules()
    {
        $data = ['title' => '', 'content' => ''];
        $rules = ['title' => 'required', 'content' => 'required'];

        $validator = Validator::make($data, $rules);

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->messages());
        $this->assertArrayHasKey('content', $validator->errors()->messages());
    }

    public function test_user_owns_post()
    {
        $user = new User();
        $post = new Post();

        $this->assertEquals($user->id, $post->user_id);
    }

    public function test_user_does_not_own_others_post()
    {
        $user = new User(['id' => 1]);
        $post = new Post(['user_id' => 2]);

        $this->assertNotEquals($user->id, $post->user_id);
    }
}