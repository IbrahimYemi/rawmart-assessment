<?php

namespace App\Console\Commands;

use App\Jobs\DeleteExpiredPostsJob;
use Illuminate\Console\Command;

class DeleteExpiredPosts extends Command
{
    protected $signature = 'posts:delete-expired';
    protected $description = 'Delete posts that have expired after 24 hours';

    public function handle()
    {
        DeleteExpiredPostsJob::dispatch();
    }
}
