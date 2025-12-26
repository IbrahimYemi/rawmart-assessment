<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'title'   => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'tags'    => 'sometimes|array|min:1',
            'tags.*'  => 'sometimes|string|max:20',
        ];
    }
}