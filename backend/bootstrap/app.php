<?php

use App\Exceptions\BadRequestException;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Http\Middleware\HandleCors;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(HandleCors::class);
        $middleware->alias([
            'forceJson' => ForceJsonResponse::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // 400 - Bad request error
        $exceptions->render(function (BadRequestException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage() ?? 'Bad request error',
            ], 400);
        });

        // 403 - Unauthorized
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => 'This action is unauthorized.',
            ], 403);
        });

        // 404 - Not Found
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => 'Not found error',
            ], 404);
        });

        // 405 - Method Not Allowed
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => 'Method not allowed',
            ], 405);
        });

        // 401 - Unauthenticated
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated',
            ], 401);
        });

        // 422 - Validation Errors
        $exceptions->render(function (ValidationException $e, Request $request) {
            return response()->json([
                'status'  => false,
                'errors'  => $e->errors(),
                'message' => implode(' :: ', array_map(
                    fn($error) => implode(' ', (array) $error),
                    $e->errors()
                )),
            ], 422);
        });

        // Catch-all fallback
        $exceptions->render(function (Throwable $e, Request $request) {
            Log::error('Unexpected Error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Seems we have broken something, try again later!',
                // 'error'  => [
                //     'message' => $e->getMessage(), 
                //     'file' => $e->getFile(),
                //     'line' => $e->getLine(),
                // ],
            ], 500);
        });
    })
    ->create();