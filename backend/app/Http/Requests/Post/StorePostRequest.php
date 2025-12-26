<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'tags'    => 'required|array|min:1',
            'tags.*'  => 'required|string|max:20',
        ];
    }
}