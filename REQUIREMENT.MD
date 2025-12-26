# Blog Application Project Requirements

## Overview
Tasked with creating a **Blog Application** with the following stack:
- **Backend:** PHP Laravel (RESTful API)
- **API Documentation:** Open API (swagger)
- **Frontend:** React
- **Database:** MySQL
- **Additional Services:** Redis (optional), Laravel Queue Worker
- **Deployment:** Docker Compose
- **Version Control:** Submit the project on GitHub

---

## Backend – Laravel (PHP)

### 1. User Authentication
- Each user must have the following fields:
  - `name`
  - `email`
  - `password`
  - `image`
- Login via **email + password**
- All API endpoints except login/signup must be authenticated
- **JWT** for API authentication
- Image uploads stored using Laravel’s filesystem

### 2. CRUD Posts
- Each post must include:
  - `title`
  - `body`
  - `author` → reference to the user model
  - `tags` → mapped to the tags model
  - `comments` → mapped to the comments model

#### Rules & Functionalities
- Users/authors can only edit/delete their own posts
- Users/authors can add comments on any post
- Users/authors can only edit/delete their own comments
- Users/authors can update post tags
- Each post must have at least one tag
- All posts must be automatically deleted after **24 hours**
- Use **Laravel + Redis + Horizon / Laravel Scheduler / Queue Worker**
- A scheduled job runs every minute/hour to delete expired posts (24 hoours or more posts)

---

## Database – MySQL
- Use **MySQL** as the database
- Design proper migrations
- Use **keys and soft deletes**
- Indexed foreign keys and appropriate relationships in Laravel models

---

## Frontend – React
The React UI must include:
- Login & Signup forms
- Authentication stored using JWT (localStorage or secure cookies)
- List of posts (feed)
- Create/Edit/Delete Post pages
- Add/Edit/Delete comments
- Tags management UI (edit tags on a post)
- Auto-refresh or UI indicator showing posts expire after 24 hours
- Communication with Laravel API using **Axios**

---

## Bonus Requirements

### Docker Compose
Create a `docker-compose.yml` file that spins up the entire stack with a single command:

```bash
docker-compose up

```

#### Stack must include:
- Laravel backend container
- MySQL database container
- Redis container (if used)
- Laravel queue worker container (for scheduled deletion of posts)
- React frontend container
- Any necessary services (e.g., Nginx)

---

## Testing
Write tests for your API endpoints using **Laravel Testing (feature or unit)**:
- Cover both happy and unhappy scenarios

### Examples:
- Successful signup/login
- Invalid credentials
- Unauthorized access to protected endpoints
