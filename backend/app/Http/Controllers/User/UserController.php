<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Services\User\UserService;

/**
 * @OA\Tag(
 *     name="User Management",
 *     description="API Endpoints for user related data"
 * )
 */
class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    /**
     * @OA\Post(
     *   path="/api/user/profile",
     *   tags={"User Management"},
     *   security={{"bearerAuth":{}}},
     *   summary="Update user profile",
     *   description="Allows the authenticated user to update their profile information (name, email, avatar).",
     *   @OA\RequestBody(
     *     required=false,
     *     @OA\MediaType(
     *         mediaType="multipart/form-data",
     *         @OA\Schema(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="j@doe.com"),
     *             @OA\Property(property="image", type="string", format="binary", description="User avatar image")
     *         )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Profile updated successfully",
     *     @OA\JsonContent(
     *       @OA\Property(property="success", type="boolean", example=true),
     *       @OA\Property(property="message", type="string", example="Profile updated"),
     *       @OA\Property(property="data", ref="#/components/schemas/User")
     *     )
     *   ),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function profile(ProfileUpdateRequest $request)
    {
        $validated = $request->validated();

        $user = $this->userService->updateProfile($validated);

        return $this->successResponse(UserResource::make($user), "Profile updated");
    }
    
    /**
     * @OA\Post(
     *   path="/api/user/change-password",
     *   tags={"User Management"},
     *   security={{"bearerAuth":{}}},
     *   summary="Change user password",
     *   description="Allows the authenticated user to change their password by providing the current password and a new one.",
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"current_password","password","password_confirmation"},
     *       @OA\Property(property="current_password", type="string", example="oldpassword123"),
     *       @OA\Property(property="password", type="string", example="newpassword123"),
     *       @OA\Property(property="password_confirmation", type="string", example="newpassword123")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Password updated successfully",
     *     @OA\JsonContent(
     *       @OA\Property(property="success", type="boolean", example=true),
     *       @OA\Property(property="message", type="string", example="Password changed successfully")
     *     )
     *   ),
     *   @OA\Response(response=401, description="Invalid current password"),
     *   @OA\Response(response=422, description="Validation error")
     * )
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $validated = $request->validated();

        $this->userService->changePassword($validated);

        return $this->messageResponse('Password changed successfully');
    }
}