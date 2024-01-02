# Star Wars API

Welcome to the Star Wars API! This project is my implementation of the Star Wars API based on the provided dataset. This API provides information about Star Wars films, characters, planets, species, starships, and vehicles.

## Hosted Here

### https://star-wars-db-api-b72e907e2488.herokuapp.com/

## Testing available with

### [Star Wars API Postman Collection](https://documenter.getpostman.com/view/4491829/2s9YsFDZTF)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Films](#films)
  - [People](#people)
  - [Planets](#planets)
  - [Species](#species)
  - [Starships](#starships)
  - [Vehicles](#vehicles)
- [Project Information](#project-information)
  - [Code Structure](#code-structure)
  - [Technologies Used](#technologies-used)
  - [Testing](#testing)
  - [Future Improvements](#future-improvemnts)

## Features

- Retrieve details about Star Wars films, characters, planets, species, starships, and vehicles.
- Search for specific characters and explore their associated films.
- Get information about planets, species, and starships in the Star Wars universe.

## Getting Started

### Installation

Clone the repository to your local machine:

```
git clone https://github.com/clintonbess/star-wars-api.git
cd star-wars-api
```

Install the dependencies

```
npm install
```

Build the server (this will create a bundled JavaScript file located in dist/main.js)

```
npm run build
```

Start the API server:

```
npm start
```

The API will be available at `http://localhost:5000`

Alternatively you can also run the server in development mode using:

```
npm run dev
```

### Database Creation

Note: The project is currently set up to modify the database used by the live Heroku app.

Remove existing tables

```
npm run rollback
```

Create the database tables

```
npm run migrate
```

Seed the tables with data

```
npm run seed
```

#### Refresh Database

Alternatively you can run all of the commands via

```
npm run refresh
```

## API Endpoints

You can explore and test the API endpoints using the provided Postman collection.

[Star Wars API Postman Collection](https://documenter.getpostman.com/view/4491829/2s9YsFCZAM)

All endpoints are protected routes. To access them, you must first register and log in to receive the necessary credentials. Upon logging in, the authentication token will be stored as a cookie for use in subsequent requests.

### Auth

- **POST /register**: Register a user to enable login.
- **POST /login**: Log in as a registered user to gain access to the API.

### Films

- **GET /api/films**: Retrieve a list of all Star Wars films.
- **GET /api/films/:id**: Retrieve details of a specific film by ID.
- **GET /api/films/:id/fastest-starship**: Retrieve the fastest starship associated with a specific film.

### People

- **GET /api/people**: Retrieve a list of all Star Wars characters (people).
- **GET /api/people/:id**: Retrieve details of a specific character by ID.
- **GET /api/people/:id/films**: Retrieve films associated with a specific character.
- **GET /api/people/:id/species**: Retrieve details of a person and information about their species.

- **GET /api/people/search**: Retrieve a list of people by searching for their character name.
- **PUT /api/people/:id**: Replace the details of a person with a new record.
- **PATCH /api/people/:id**: Partially update the details of a person.
- **DELETE /api/people/:id**: Deletes a person.

### Planets

- **GET /api/planets**: Retrieve a list of all Star Wars planets.
- **GET /api/planets/:id**: Retrieve details of a specific planet by ID.
- **GET /api/planets/:id/species**: Retrieve details of a planet and a list of species that inhabit it.

### Species

- **GET /api/species**: Retrieve a list of all Star Wars species.
- **GET /api/species/:id**: Retrieve details of a specific species by ID.

### Starships

- **GET /api/starships**: Retrieve a list of all Star Wars starships.
- **GET /api/starships/:id**: Retrieve details of a specific starship by ID.
- **GET /api/starships/:id/pilots**: Retrieve details of a specific starship and a list of its pilots.

- **PUT /api/starships/:id**: Replace the details of a starship with a new record.
- **PATCH /api/starships/:id**: Partially update the details of a starship.
- **DELETE /api/starships/:id**: Deletes a starship.

### Vehicles

- **GET /api/vehicles**: Retrieve a list of all Star Wars vehicles.
- **GET /api/vehicles/:id**: Retrieve details of a specific vehicle by ID.

- **POST /api/vehicles/**: Insert a new Star Wars vehicle.
- **PUT /api/vehicles/:id**: Replace the details of a vehicle with a new record.
- **PATCH /api/vehicles/:id**: Partially update the details of a vehicle.
- **DELETE /api/vehicles/:id**: Deletes a vehicle.

# Project Information

## Code Structure

The project's source code is organized as follows:

- [controllers](src/controllers/): Contains controller modules for handling various API endpoints.
- [db](src/db/): Includes the database configuration file and a singleton of the database.
- [middleware](src/middleware/): Holds middleware functions used in the API.
- [models](src/models/): Houses data models representing entities in the Star Wars universe.
- [routes](src/routes/): Defines API routes and their corresponding controllers.

## Technologies Used

Below is a list of the technologies and their descriptions that were used in the project.

### Backend:

- **Express.js (v4.18.2):**
  A minimalist web framework for Node.js, used for building the backend API.

- **Bcrypt.js (v2.4.3):**
  A library for hashing passwords to enhance security, particularly useful for user authentication.

- **Cookie-parser (v1.4.6):**
  Middleware for parsing cookies in Express.

- **Jsonwebtoken (v9.0.2):**
  JSON Web Token (JWT) implementation for creating and verifying authentication tokens.

- **Pg (v8.11.3):**
  A PostgreSQL client for Node.js, used for interacting with the PostgreSQL database.

- **Xlsx (v0.18.5):**
  A library for reading and writing Excel files.

### Development:

- **Babel (v7.23.7):**
  A JavaScript compiler that enables the use of the latest ECMAScript features, ensuring compatibility across different environments.

- **Jest (v29.7.0):**
  A testing framework for writing and running unit tests.

- **Supertest (v6.3.3):**
  A library for testing HTTP assertions, often used in combination with Jest for API testing.

- **Webpack (v5.89.0):**
  Used alongside Babel to bundle the project and use the latest version of ECMAScript.

- **Knex (v3.1.0):**
  A SQL query builder for Node.js. Used for creating migrations and seeding data.

- **Nodemon-webpack-plugin (v4.8.2):**
  A Nodemon plugin for Webpack that automatically restarts the server during development when changes are detected.

### Authentication and Authorization:

- **Bcrypt.js, Jsonwebtoken, and Cookie-parser:**
  Combined to implement secure user authentication and manage user sessions.

### Database:

- **PostgreSQL:**
  A powerful, open-source relational database used to store and retrieve data for the application.

## Testing

Unit tests are ready for each route. To run them, simply use the following command:

```
npm test
```

## Improvements to Consider

### Separate Database for Testing:

Currently, the project could benefit from the implementation of a separate database specifically designated for testing purposes. This approach ensures that tests are conducted in isolation, preventing interference with the production database.

### Continuous Integration (CI):

The project could greatly benefit from the implementation of a robust continuous integration (CI) pipeline. CI systems automate the process of building, testing, and deploying code changes, ensuring that new updates are thoroughly tested before being merged into the main branch.
