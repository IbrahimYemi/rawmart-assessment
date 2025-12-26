<?php

namespace App\Services\User;

use App\Services\FileService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService
{
    protected FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    /**
     * Update user profile.
     */
    public function updateProfile(array $data)
    {
        $user = auth()->user();

        if (isset($data['image'])) {
            if ($user->image) {
                $this->fileService->delete($user->image);
            }

            $data['image'] = $this->fileService->upload(
                $data['image'],
                'avatars'
            );
        }

        $user->update([
            'name'  => $data['name']  ?? $user->name,
            'email' => $data['email'] ?? $user->email,
            'image' => $data['image'] ?? $user->image,
        ]);

        return $user->fresh();
    }

    /**
     * Change user password.
     */
    public function changePassword(array $data): bool
    {
        $user = auth()->user();

        if (!Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return true;
    }
}
