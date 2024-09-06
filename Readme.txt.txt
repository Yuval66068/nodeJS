# Node.js Express API with Mongoose and JWT Authentication

## Project Overview
This is a Node.js project built with Express, Mongoose (MongoDB), and JSON Web Tokens (JWT) for user authentication and authorization. It includes user registration, login, and CRUD operations for users, along with role-based access control for admins and regular users.

## Project Structure

- `controllers/`: Contains functions for handling various user-related operations (register, login, edit, delete, etc.).
- `middlewares/`: Includes custom middleware for authentication and authorization (admin and user-level).
- `db/models/`: Contains Mongoose models for MongoDB (e.g., `User`).
- `db/validations/`: Contains schema validation using Joi.
- `routes/`: Defines routes for handling user-related API requests.

## Features
- User registration and login with password hashing (bcrypt).
- JWT-based authentication and authorization.
- Admin-only routes for managing users.
- User-specific routes for profile management.
- Middleware for role-based access control (admin and user).

## Prerequisites

Make sure you have the following installed:
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)
- npm (Node package manager)

## Installation

1. Clone the repository:

2. Navigate to the project directory:3. Install dependencies:

3. Install dependencies:


4. Create a `.env` file in the root directory and add the following variables:


## Usage

### Running the Application

1. Start the server:


This will start the application at `http://localhost:3000`.

### API Endpoints

#### 1. User Registration

- **URL**: `/api/users`
- **Method**: POST
- **Body Parameters**:
  - `name`: String
  - `email`: String
  - `password`: String
- **Response**: Success or error message.

#### 2. User Login

- **URL**: `/api/users/login`
- **Method**: POST
- **Body Parameters**:
  - `email`: String
  - `password`: String
- **Response**: JWT token upon successful login.

#### 3. Get All Users (Admin Only)

- **URL**: `/api/users`
- **Method**: GET
- **Headers**:
  - `Authorization`: Bearer <admin_jwt_token>
- **Response**: List of all users.

#### 4. Get User By ID (Admin or User)

- **URL**: `/api/users/:id`
- **Method**: GET
- **Headers**:
  - `Authorization`: Bearer <user_jwt_token>
- **Response**: User data if authorized.

#### 5. Edit User (Only the Logged-in User)

- **URL**: `/api/users/:id`
- **Method**: PUT
- **Headers**:
  - `Authorization`: Bearer <user_jwt_token>
- **Body Parameters**: Fields to be updated (e.g., `name`, `email`, etc.)
- **Response**: Updated user data.

#### 6. Toggle User Business Status (Only the Logged-in User)

- **URL**: `/api/users/:id`
- **Method**: PATCH
- **Headers**:
  - `Authorization`: Bearer <user_jwt_token>
- **Response**: Updated user business status (`isBusiness`).

#### 7. Delete User (Admin or Logged-in User)

- **URL**: `/api/users/:id`
- **Method**: DELETE
- **Headers**:
  - `Authorization`: Bearer <user_jwt_token>
- **Response**: Deleted user data.

## Middleware

### 1. `requireAdminAuth`

This middleware ensures that only admins can access certain routes.

- Used in the route for getting all users.

### 2. `requireAuth`

This middleware ensures that only authenticated users can access certain routes (non-admin).

- Used for routes like editing a user or toggling the business status.

### 3. `extractUserInfo`

This middleware extracts the JWT token from the request headers and attaches the user data to the request object.

- Used in the `getUserById` route to verify if the user requesting the data is authorized.

## Validations

The project uses `Joi` for validating user input. The validation schemas are defined in the `db/validations/` directory.

## Environment Variables

The following environment variables are used in this project:

- `JWT_SECRET`: Secret key for signing JWT tokens.
- `MONGO_URI`: MongoDB connection string.

Make sure to configure these in your `.env` file.

## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `bcrypt`: Library for hashing passwords.
- `jsonwebtoken`: Library for working with JWT tokens.
- `dotenv`: Loads environment variables from `.env` file.
- `joi`: Input validation library.
- `nodemon`: Tool to automatically restart the server during development.

## License
This project is licensed under the MIT License.
