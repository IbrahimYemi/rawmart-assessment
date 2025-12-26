<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Throwable;

trait ApiResponderTrait
{
    /**
     * Universal success response.
     */
    protected function successResponse(
        mixed $data = null,
        string $message = 'Request successful',
        int $code = 200,
        array $meta = []
    ): JsonResponse {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data ?: [],
            'meta' => $meta ?: null,
        ], $code);
    }

    /**
     * Standard error response.
     */
    protected function errorResponse(
        string $message = 'Something went wrong',
        int $code = 400,
        mixed $errors = null
    ): JsonResponse {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }

    /**
     * Paginated response with meta.
     * Universal paginated response handler
     *
     * @param \Illuminate\Pagination\LengthAwarePaginator $paginator
     * @param string $message
     * @param string|null $resourceClass  Fully qualified Resource class name
     * @param int $statusCode
     */
    protected function paginatedResponse(
        $paginator,
        $message = 'Success',
        $resourceClass = null,
        $statusCode = 200
    ) {
        // If a resource class is provided, wrap items using that resource
        $data = $resourceClass
            ? $resourceClass::collection($paginator->getCollection())
            : $paginator->items();

        return response()->json([
            'status'  => true,
            'message' => $message,
            'data'    => $data,
            'meta'    => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'hasMore'      => $paginator->lastPage() !== $paginator->currentPage(),
            ],
            'links' => [
                'first' => $paginator->url(1),
                'last'  => $paginator->url($paginator->lastPage()),
                'prev'  => $paginator->previousPageUrl(),
                'next'  => $paginator->nextPageUrl(),
            ]
        ], $statusCode);
    }

    /**
     * Simple message-only response.
     */
    protected function messageResponse(string $message, int $code = 200): JsonResponse
    {
        if ($code < 300) {
            return $this->successResponse(null, $message, $code);
        } else {
            return $this->errorResponse($message, $code);
        }
    }
}