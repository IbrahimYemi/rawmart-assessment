<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'content'       => $this->content,
            'tags'          => $this->tags->pluck('name'),
            'created_at'    => $this->created_at?->toIso8601String(),
            'user'          => [
                'id'    => $this->user?->id,
                'name'  => $this->user?->name,
                'image' => $this->user?->image,
            ],
            'comments_count'=> $this->comments_count ?? 0,
            'comments'      => $this->whenLoaded('comments', CommentResource::collection($this->comments)),
        ];
    }
}