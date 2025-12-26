#!/bin/bash
set -e

echo "Preparing Laravel application..."

mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Running migrations..."
php artisan migrate --force || true

php artisan config:clear || true
php artisan config:cache || true
php artisan route:cache || true

echo "Starting PHP-FPM..."
exec php-fpm
