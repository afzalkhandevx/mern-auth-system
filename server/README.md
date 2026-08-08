# MERN Authentication System

A full-stack authentication system built with React, Node.js, Express, and MongoDB. Built as part of the CodeAlpha Web Development Internship.

## Features

- **User Registration & Login** — secure signup/login with hashed passwords (bcrypt)
- **JWT Authentication** — short-lived access tokens (15 min) + long-lived refresh tokens (7 days), stored in httpOnly cookies
- **Token Refresh** — automatic access token renewal via a dedicated refresh endpoint
- **Email Verification** — OTP-based email verification sent via SMTP (Brevo)
- **Forgot / Reset Password** — OTP-based password reset flow
- **Protected Routes** — custom `isAuthenticated` middleware guards private API routes; frontend restricts access to logged-in users
- **User Dashboard** — displays logged-in user's name, email, and verification status
- **Secure Cookie Handling** — httpOnly, sameSite, and secure flags configured for production

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, React Toastify

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, Nodemailer (Brevo SMTP)

## Project Structure

```
MERN-auth/
├── client/                 # React frontend
│   └── src/
│       ├── pages/          # Login, Home, EmailVerify, ResetPassword
│       └── context/        # AppContext (global auth state)
├── server/                 # Express backend
│   ├── config/             # MongoDB & Nodemailer config
│   ├── controllers/        # Auth & user logic
│   ├── middleware/         # isAuthenticated middleware
│   ├── models/             # User schema
│   └── routes/             # Auth & user API routes
├── .env.example
└── .gitignore
```

## API Endpoints

| Method | Endpoint                      | Description                     | Auth Required |
|--------|--------------------------------|----------------------------------|----------------|
| POST   | `/api/auth/register`          | Register a new user             | No             |
| POST   | `/api/auth/login`             | Log in a user                   | No             |
| POST   | `/api/auth/logout`            | Log out and clear cookies       | No             |
| POST   | `/api/auth/refresh`           | Get a new access token          | No (uses refresh token cookie) |
| POST   | `/api/auth/send-verify-otp`   | Send email verification OTP     | Yes            |
| POST   | `/api/auth/verify-account`    | Verify email using OTP          | Yes            |
| POST   | `/api/auth/send-reset-otp`    | Send password reset OTP         | No             |
| POST   | `/api/auth/reset-password`    | Reset password using OTP        | No             |
| GET    | `/api/user/data`              | Get logged-in user's data       | Yes            |

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MERN-auth
```

### 2. Backend setup
```bash
npm install
```

Create a `.env` file in the root folder (use `.env.example` as a reference) and fill in:
```
PORT=4000
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
SENDER_EMAIL=
SMTP_USER=
SMTP_PASSWORD=
NODE_ENV=development
```

Start the backend:
```bash
npm run server
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

## Security Notes

- Passwords are hashed with bcrypt before storage — never stored in plain text
- Access tokens are short-lived (15 min) to limit exposure if leaked
- Refresh tokens are stored in httpOnly cookies, inaccessible to client-side JavaScript
- OTPs for email verification and password reset expire after a set time window

## Author

Afzal Khan — B.Tech/BCA Computer Science student, MERN stack developer