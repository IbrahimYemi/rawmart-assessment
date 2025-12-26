<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name'  => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . auth()->id(),
            'image' => 'sometimes|image|max:2048',
        ];
    }
}