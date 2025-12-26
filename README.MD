# RAWMART — Blog Assessment

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat-square\&logo=laravel)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square\&logo=react)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square\&logo=docker)

**RAWMART** is a Dockerized full-stack blog application featuring **ephemeral posts** that automatically expire after 24 hours. It demonstrates clean architecture, secure API design, and modern Laravel + React best practices.

---

## Features

* Ephemeral posts with automatic 24h deletion (Scheduler + Queue)
* Full CRUD for posts, comments, and tags
* JWT-based authentication
* Strict authorization via Laravel Policies
* React frontend with responsive UI
* OpenAPI (Swagger) API documentation
* Feature and unit tests (happy & unhappy paths)

---

## Tech Stack

* **Backend:** Laravel 12 (PHP 8.4), JWT, Redis, Horizon
* **Frontend:** React 19, Tailwind CSS, Framer Motion
* **Database:** MySQL 8
* **Infrastructure:** Docker Compose, Nginx

---

## Assessor Note (Important)

This project uses **pre-built Docker images**.

❗ **No Docker image build is required**.

To run the entire stack, simply execute:

```bash
docker-compose up
```

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/IbrahimYemi/rawmart-assessment.git
cd rawmart-assessment

# Environment setup
cp ./.env.example ./.env
cp ./backend/.env.example ./backend/.env

# Start application (no image build required)
docker-compose up

# Generate runtime secrets and commands (optional for new secrets)
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan jwt:secret

```

---

## Access Points

* **Backend API:** [http://localhost:8080](http://localhost:8080)
* **API Documentation (Swagger):** [http://localhost:8080/api/documentation](http://localhost:8080/api/documentation)
* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Horizon Dashboard:** [http://localhost:8080/horizon](http://localhost:8080/horizon)

---

## Running Tests

```bash
docker-compose -f docker-compose.test.yml -p rawmart-test up -d
docker-compose -f docker-compose.test.yml -p rawmart-test run --rm backend-test php artisan migrate --env=testing
docker-compose -f docker-compose.test.yml -p rawmart-test exec backend-test php artisan test
docker-compose -f docker-compose.test.yml -p rawmart-test down -v
```

---

## Architecture Notes

* Service-layered business logic
* Policy-based authorization
* Queue worker + scheduler for post expiration
* Atomic database transactions

---

## Author

**Ibrahim Sarafadeen**
GitHub: [@IbrahimYemi](https://github.com/IbrahimYemi)
Portfolio: [https://ibrahimyemi.com](https://ibrahimyemi.com)
LinkedIn: [https://linkedIn.com](http://www.linkedin.com/in/ibrahim-sarafadeen-opeyemi95)

---
