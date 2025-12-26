<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'      => $this->id,
            'time'    => $this->created_at?->diffForHumans(),
            'user_id' => $this->user_id,
            'text'    => $this->text,
            'user'    => [
                'id'    => $this->user?->id,
                'name'  => $this->user?->name,
                'image' => $this->user?->image,
            ],
        ];
    }
}