<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'expires_at',
        'deleted_at'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Automatically exclude expired posts from queries.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('excludeExpired', function (Builder $builder) {
            $builder->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now());
            });
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function scopeOwnedBy($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
