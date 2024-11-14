# Angel's Pizza API - Products

## ap-api-products

## Overview

This is a [NestJS](https://nestjs.com/) project that uses PostgreSQL as the database. The project follows the code-first approach with TypeORM to automatically synchronize the database schema from the entities defined in the code.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (version 18.x or above)
- **PostgreSQL** (version 15.x or above)
- **Docker** (optional, if you are using Docker for your database)

## Getting Started

Follow these instructions to set up the project on your local machine.

Clone the project from the repository:

```bash
git clone https://github.com/angels-pizza-developers/ap-api-products.git
cd ap-api-products
```

## Project setup

```bash
npm install
# or
yarn install
```

## Configure Environment Variables

Create a .env file in the root directory based on the .env.example file. Update it with your local environment settings.

Example .env file:

```bash
# App Config
PORT=3000
API_PREFIX=api/v1
BASE_URL=http://localhost

# AUTH
AUTH_ACCESS_TOKEN_EXPIRE=1hr
AUTH_VERIFY_TOKEN_EXPIRE=1hr
AUTH_ALGORITHM=RS256

# JWT secret key
JWT_SECRET=yourJWTSecret

#Facebook Auth
FACEBOOK_CLIENT_ID=yourFacebookClientId
FACEBOOK_CLIENT_SECRET=yourFacebookSecret
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# Google OAuth credentials
GOOGLE_CLIENT_ID=yourGoogleClientId
GOOGLE_CLIENT_SECRET=yourGoogleSecret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Database Config
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=yourdbname
DB_SYNCHRONIZE=true  # Set to true to enable automatic schema sync (development only)
DB_LOGGING=true
SSL=false
```

## Set Up the PostgreSQL Database

```bash
psql -U postgres -c "CREATE DATABASE yourdbname;"
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Project File Structure

```bash
root
|-- src
    |-- common
        |-- auto-mapper
        |-- decorators
        |-- filters
        |-- guards
        |-- interceptors
        |-- pipes
    |-- config
    |-- database
        |-- entities
    |-- integrations
        |-- firebase
        |-- onesignal
    |-- main.ts
    |-- modules
        |-- auth
        |-- order
        |-- product
        |-- user
    |-- shared
        |-- constants
        |-- utils
|-- test

```
