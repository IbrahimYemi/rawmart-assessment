#!/bin/bash
set -e

MAX_WAIT=60
counter=0
while ! nc -z "$DB_HOST" "${DB_PORT:-3306}"; do
  counter=$((counter+2))
  if [ $counter -ge $MAX_WAIT ]; then
    echo "MySQL not available after $MAX_WAIT seconds. Please run manually."
    exit 1
  fi
  echo "MySQL not ready yet..."
  sleep 2
done

echo "Preparing Laravel application..."
mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Running migrations..."
php artisan migrate --force || true

echo "Caching configs..."
php artisan config:clear || true
php artisan config:cache || true
php artisan route:cache || true

echo "Starting PHP-FPM..."
exec php-fpm
