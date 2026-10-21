# UniSys

A REST API backend for a university management system, built with Typescript (migrated from JavaScript), Express and MySQL. It supports three roles — Student, Teacher, and Secretary — each with their own set of permissions, and ships with interactive Swagger documentation.

## Features

- JWT authentication with role-based access control across three permission levels
- Course registration and grading workflows, with authorization enforced per-resource
- Secretary-level CRUD over students, teachers, and courses, plus semester advancement
- Interactive API docs via Swagger UI

## Tech Stack

- TypeScript
- Node.js / Express
- MySQL
- JWT for statelessness with role-based access control (roles are encoded inside the token)
- `bcrypt` for password hashing
- `joi` for request validation
- `swagger-jsdoc` + `swagger-ui-express` for API documentation
- Docker / Docker Compose for quick and containerized build


## ER Model

![ER Diagram](backend/docs/ER.png)

The system has a single Secretary account that seeds its credentials from the environment file, and since that account is the moderator of the system it cannot be created, edited or deleted.

## Run It Yourself!

### Prerequisites

- Docker

### Setup

1. Clone the repository.
2. Rename `backend/.envexample` to `backend/.env`
3. From the `backend` directory, start the stack:

   ```bash
   docker compose up --build
   ```

   This starts up the API server and a MySQL database, seeded  from `db/init.sql` . 

4. The API will be available at `http://localhost:<PORT>`.

### API Documentation

Once the server is running, Swagger UI is available at:

```
http://localhost:<PORT>/docs
```

To try authenticated routes: log in via `POST /login` with the provided demo accounts or use the credentials mentioned in the .env file for the secretary, copy the returned `token`, then click **Authorize** in the Swagger UI and paste it in.

## License

ISC
