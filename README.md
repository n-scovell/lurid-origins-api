# Lurid Origins API

REST API for [Lurid Origins](https://lurid-origins.com), a horror movie library for cataloging and exploring horror films.

The API provides movie data management, validation, database access, and the foundation for the Lurid Origins frontend application.

## Tech Stack

* **Node.js**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL / Neon**
* **Zod**
* **Vercel**

## Features

### Movie Management

* Create and manage movie records
* Movie metadata including title, year, director, actors, tags, and ratings
* Watched status
* Horror era classification
* Comments and additional movie information
* Trailer references
* Duplicate movie/year protection

### API Validation

Incoming request data is validated with Zod before being processed by the application.

This provides consistent validation at the API boundary and prevents invalid data from being written to the database.

### Database

Prisma is used as the ORM for PostgreSQL database access.

The database schema is maintained through Prisma and supports the movie catalog and its associated metadata.

### Deployment

The API is deployed on Vercel.

**Production API:**

https://lurid-origins-api.vercel.app

## API

The primary movie endpoint is:

```text
GET /api/movies
POST /api/movies
```

Additional API operations are available for managing the movie catalog.

## Project Structure

```text
prisma/
├── Database schema and Prisma configuration

scripts/
├── Database/import utilities

src/
├── API routes
├── Services
└── Application logic
```

The project separates API handling, application logic, and database access to keep the codebase maintainable as the movie catalog grows.

## Related Project

The Lurid Origins frontend provides the user-facing movie library and consumes this API.

## Project

Lurid Origins is a personal full-stack project focused on building a searchable horror movie library while exploring API design, database modeling, validation, and deployment.
