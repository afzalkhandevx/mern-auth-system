# MERN Auth & Blog System

A full-stack MERN application featuring secure authentication and a complete blogging platform, built as part of a step-by-step learning journey — from a robust auth system to a feature-rich blog built on top of it.

## Features

### 🔐 Authentication System
- JWT-based dual-token authentication (short-lived access token + 7-day refresh token stored in httpOnly cookies)
- Secure password hashing with bcrypt
- Email verification via OTP (Nodemailer + Brevo SMTP)
- Password reset flow via OTP
- Protected routes with middleware-based auth checks

### 📝 Blogging Platform
- Full CRUD for blog posts (create, read, update, delete)
- Comment system on posts (add, view, delete)
- Search posts by title/content
- Pagination for post listings
- Author-only permissions for editing/deleting posts and comments
- Clean, responsive UI built with React + Tailwind CSS

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, React Toastify, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB (Mongoose)
**Auth:** JWT, bcrypt, httpOnly cookies
**Email:** Nodemailer with Brevo SMTP

## Project Structure

```
MERN-auth/
├── client/                 # React frontend
│   └── src/
│       ├── pages/          # Login, Home, BlogHome, PostDetail, CreatePost, EditPost, etc.
│       ├── components/     # CommentSection, etc.
│       └── context/        # AppContext (auth state, axios config)
├── server/                 # Express backend
│   ├── models/             # userModels, Post, Comment
│   ├── controllers/        # authcontroller, postController, commentController
│   ├── routes/              # auth routes, postRoutes, commentRoutes
│   └── middleware/         # userAuth
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/send-verify-otp` | Send email verification OTP |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/send-reset-otp` | Send password reset OTP |
| POST | `/api/auth/reset-password` | Reset password |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Get all posts (supports `?page`, `?limit`, `?search`) |
| GET | `/api/posts/:id` | Get a single post |
| POST | `/api/posts` | Create a post (auth required) |
| PUT | `/api/posts/:id` | Update a post (author only) |
| DELETE | `/api/posts/:id` | Delete a post (author only) |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/comments/:postId` | Get all comments on a post |
| POST | `/api/comments/:postId` | Add a comment (auth required) |
| DELETE | `/api/comments/:id` | Delete a comment (author only) |

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
SENDER_EMAIL=your_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
NODE_ENV=development
```

Run the server:
```bash
npm run server
```

### Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```
VITE_BACKEND_URL=http://localhost:4000
```

Run the frontend:
```bash
npm run dev
```

## Roadmap
- [x] Authentication system with JWT + email verification
- [x] Blog post CRUD with search & pagination
- [x] Comment system
- [ ] Image upload for posts
- [ ] Likes/reactions
- [ ] Categories/tags

## Author
**Afzal Khan** — BCA student, MERN stack developer