<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileService
{
    protected string $disk;

    public function __construct(?string $disk = null)
    {
        $this->disk = $disk ?? config('filesystems.default');
    }

    /**
     * Upload file and return FULL public URL
     */
    public function upload(
        UploadedFile $file,
        string $folder = 'uploads'
    ): string {
        $path = $file->storePublicly($folder, [
            'disk' => $this->disk,
        ]);

        return $this->url($path);
    }

    /**
     * Generate FULL URL for a stored file
     */
    public function url(string $path): string
    {
        return Storage::disk($this->disk)->url($path);
    }

    /**
     * Delete file using FULL URL or relative path
     */
    public function delete(string $fileUrlOrPath): bool
    {
        $path = $this->extractPathFromUrl($fileUrlOrPath);

        if (Storage::disk($this->disk)->exists($path)) {
            return Storage::disk($this->disk)->delete($path);
        }

        return false;
    }

    /**
     * Extract storage path from FULL URL
     */
    protected function extractPathFromUrl(string $value): string
    {
        // If already a relative path
        if (!Str::startsWith($value, ['http://', 'https://'])) {
            return $value;
        }

        $baseUrl = rtrim(Storage::disk($this->disk)->url(''), '/');

        return ltrim(str_replace($baseUrl, '', $value), '/');
    }
}
