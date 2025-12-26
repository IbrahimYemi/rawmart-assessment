<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\FileService;

class AuthService
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function register(array $data)
    {
        
        if (isset($data['image'])) {
            $data['image'] = $this->fileService->upload(
                $data['image'],
                'avatars'
            );
        } else {
            $data['image'] = null;
        }

        $user = User::create($data);

        $token = auth('api')->login($user);

        return [
            'user' => UserResource::make($user),
            'access_token' => $token,
            'token_type' => 'bearer',
        ];
    }

    public function login(array $credentials)
    {
        if (!$token = auth('api')->attempt($credentials)) {
            return null;
        }

        return [
            'user' =>  UserResource::make(auth('api')->user()),
            'access_token' => $token,
            'token_type' => 'bearer',
        ];
    }

    public function logout()
    {
        auth('api')->logout();

        return ['message' => 'Successfully logged out'];
    }

    public function me()
    {
        return UserResource::make(User::withCount('posts', 'comments')->firstWhere( 'id', auth('api')->id()));
    }
}
