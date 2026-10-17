# E-Commerce Backend API

A RESTful backend for an e-commerce application. It provides authentication, user and role management, product browsing and management, address management, shopping cart operations, and order processing.

## Technologies

- **Node.js**, **Express 5**, and **TypeScript**
- **PostgreSQL** with **Prisma ORM**
- **JWT** authentication and **bcryptjs** password hashing
- **Zod** request validation
- **Helmet**, **CORS**, and XSS sanitization for additional request protection

## Getting Started

### Requirements

- Node.js and npm
- PostgreSQL database

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="replace_with_a_secure_secret"
HASH_SALT=10
NODE_DEV=development
```

Set the values to match your local environment. Keep `.env` private and do not commit secrets.

### Database Setup

Run the existing migrations and generate the Prisma client:

```bash
npx prisma migrate deploy
npx prisma generate
```

### Run the API

```bash
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

The development server runs through `tsx` and `nodemon`. The build compiles TypeScript into JavaScript; `npm start` expects the compiled entry point at `dist/server.js`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with automatic restarts |
| `npm run build` | Compile TypeScript |
| `npm start` | Run the compiled server |

## Routes

All API routes are prefixed with `/api/v1`. Protected routes require authentication. Product creation, updates, and deletion, user administration, order administration, and role changes require admin access where configured.

| Base path | Main endpoints |
| --- | --- |
| `/health` | `GET /health` — health check |
| `/auth` | `POST /register`, `POST /login`, `GET /me` |
| `/products` | `GET /`, `GET /:id`, `GET /search-products`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `/addresses` | `GET /`, `POST /`, `DELETE /:id` |
| `/users` | `GET /`, `PUT /`, `GET /:id`, `PUT /:id` |
| `/cart` | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `/orders` | `GET /`, `POST /`, `GET /:id`, `PUT /:id`, `GET /allOrders`, `GET /listUserOrders/:id`, `PUT /change-status/:id` |

For example, the login endpoint is `POST /api/v1/auth/login`.

## Project Structure

```text
src/
  config/        Database setup
  controllers/   Request handlers
  middlewares/   Authentication, roles, validation, and errors
  routes/        API route definitions
  validators/    Request schemas
  utils/         Shared helpers
  app.ts         Express app and middleware setup
  server.ts      Server startup
prisma/          Schema and database migrations
```

## Notes

- Send and receive JSON for API requests unless an endpoint requires otherwise.
- The API connects to PostgreSQL at startup; ensure `DATABASE_URL` is valid before running it.
- Authentication and authorization are applied per route, so check the route definitions when integrating a client.
