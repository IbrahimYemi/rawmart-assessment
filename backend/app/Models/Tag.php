<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'post_id',
        'name',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
