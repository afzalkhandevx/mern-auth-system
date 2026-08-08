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
