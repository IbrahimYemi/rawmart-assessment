#!/bin/bash
set -e

echo "Starting Laravel app..."

if [ "$RUN_MIGRATIONS" = "true" ]; then
    php artisan migrate --force
fi

php artisan config:clear || true
php artisan config:cache || true
php artisan route:cache  || true

exec php-fpm
