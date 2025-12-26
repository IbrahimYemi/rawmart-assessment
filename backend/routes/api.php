<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Post\CommentController;


Route::middleware('forceJson')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
    });

    Route::middleware('auth:api')->group(function () {

        Route::prefix('auth')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
        });

        Route::prefix('user')->group(function () {
            Route::post('profile', [UserController::class, 'profile']);         
            Route::post('change-password', [UserController::class, 'changePassword']);
        });

        Route::prefix('posts')->group(function () {
            
            Route::get('/', [PostController::class, 'feeds']);
            Route::get('/personal-posts', [PostController::class, 'personal']);

            Route::get('/{post}', [PostController::class, 'show']);

            Route::post('/', [PostController::class, 'store']);
            Route::put('/{post}', [PostController::class, 'update']); 
            Route::put('/{post}/update-tags', [PostController::class, 'updateTag']); 
            Route::delete('/{post}', [PostController::class, 'destroy']);

            
            Route::post('/{post}/comments', [CommentController::class, 'store']);
            Route::put('/{post}/comments/{comment}', [CommentController::class, 'update']); 
            Route::delete('/{post}/comments/{comment}', [CommentController::class, 'destroy']); 
        });

    });
});
