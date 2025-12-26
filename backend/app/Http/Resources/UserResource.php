<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id ?? 'new-user',
            'name'      => $this->name,
            'email'     => $this->email,
            'image'     => $this->image,
            'joined_at' => 'Joined ' . $this->created_at->format('M Y'),
            'created_at'=> $this->created_at->toISOString(),
            'articles'  => $this->posts_count ?? 0,
            'comments'  => $this->comments_count ?? 0,
        ];
    }
}