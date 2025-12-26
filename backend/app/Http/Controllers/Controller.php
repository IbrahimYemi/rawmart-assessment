<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponderTrait;

/**
 * @OA\Info(
 *     title="Rawmart Blog API",
 *     version="1.0.0",
 *     description="API documentation for the RAWMART BLOG ASSESSMENT API",
 *     @OA\Contact(
 *         email="ibrahimsharafadeen95@gmail.com"
 *     )
 * ),
 *
 * @OA\Schema(
 *   schema="User",
 *   type="object",
 *   description="User resource representation",
 *   @OA\Property(property="id", type="string", example="new-user"),
 *   @OA\Property(property="name", type="string", example="John Doe"),
 *   @OA\Property(property="email", type="string", example="j@doe.com"),
 *   @OA\Property(property="image", type="string", example="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"),
 *   @OA\Property(property="joined_at", type="string", example="Joined Dec 2023"),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-21T13:53:01.000000Z"),
 *   @OA\Property(property="articles", type="integer", example=12),
 *   @OA\Property(property="comments", type="integer", example=46)
 * ),
 *
 *
 * @OA\Schema(
 *   schema="UserSummary",
 *   type="object",
 *   description="Minimal user representation",
 *   @OA\Property(property="id", type="string", example="new-user"),
 *   @OA\Property(property="name", type="string", example="John Doe"),
 *   @OA\Property(property="image", type="string", example="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde")
 * ),
 * 
 * @OA\Schema(
 *   schema="Comment",
 *   type="object",
 *   description="Comment resource representation",
 *   @OA\Property(property="id", type="integer", example=101),
 *   @OA\Property(property="time", type="string", example="3 minutes ago"),
 *   @OA\Property(property="user_id", type="string", example="new-user"),
 *   @OA\Property(property="text", type="string", example="Great insights!"),
 *   @OA\Property(property="user", ref="#/components/schemas/UserSummary")
 * ),
 * 
 * @OA\Schema(
 *   schema="Post",
 *   type="object",
 *   description="Post resource representation",
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="title", type="string", example="The Future of React 19"),
 *   @OA\Property(property="content", type="string", example="Exploring the new compiler and actions API in the upcoming release..."),
 *   @OA\Property(
 *     property="tags",
 *     type="array",
 *     @OA\Items(type="string", example="react")
 *   ),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2025-12-24T06:36:00.000Z"),
 *   @OA\Property(property="user", ref="#/components/schemas/UserSummary"),
 *   @OA\Property(
 *     property="comments",
 *     type="array",
 *     @OA\Items(ref="#/components/schemas/Comment")
 *   )
 * ),
 * 
 * @OA\Schema(
 *   schema="PaginationMeta",
 *   type="object",
 *   description="Pagination metadata",
 *   @OA\Property(property="current_page", type="integer", example=1),
 *   @OA\Property(property="last_page", type="integer", example=5),
 *   @OA\Property(property="per_page", type="integer", example=10),
 *   @OA\Property(property="total", type="integer", example=50)
 * ),
 * 
 * @OA\Schema(
 *   schema="PaginationLinks",
 *   type="object",
 *   description="Pagination navigation links",
 *   @OA\Property(property="first", type="string", example="http://api.test/api/posts?page=1"),
 *   @OA\Property(property="last", type="string", example="http://api.test/api/posts?page=5"),
 *   @OA\Property(property="prev", type="string", nullable=true, example="http://api.test/api/posts?page=1"),
 *   @OA\Property(property="next", type="string", nullable=true, example="http://api.test/api/posts?page=3")
 * ),
 * 
 * @OA\Schema(
 *   schema="PaginatedPosts",
 *   type="object",
 *   description="Paginated response of posts",
 *   @OA\Property(property="status", type="boolean", example=true),
 *   @OA\Property(property="message", type="string", example="Success"),
 *   @OA\Property(
 *     property="data",
 *     type="array",
 *     @OA\Items(ref="#/components/schemas/Post")
 *   ),
 *   @OA\Property(property="meta", ref="#/components/schemas/PaginationMeta"),
 *   @OA\Property(property="links", ref="#/components/schemas/PaginationLinks")
 * )
 */

abstract class Controller
{
    use ApiResponderTrait;
}
