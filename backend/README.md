# Campus Pulse - Backend (Auth)

This folder contains a minimal Express backend providing authentication endpoints for the Campus Pulse frontend.

Features
- Signup (/api/auth/signup)
- Login (/api/auth/login)

Quick start

1. cd into backend and install dependencies:

```powershell
cd backend; npm install
```

2. Start server:

```powershell
npm run dev
```

By default the server listens on port 5000. You can set environment variables in a `.env` file (e.g. `PORT` and `JWT_SECRET`).

API examples

Signup (POST /api/auth/signup)
Request body JSON:

{
  "fullName": "Alice Student",
  "email": "alice@example.edu",
  "year": 2,
  "class": "CSA",
  "password": "secret123"
}

Response: { user, token }

Login (POST /api/auth/login)
Request body JSON:

{
  "email": "alice@example.edu",
  "password": "secret123"
}

Response: { user, token }

Integrate with React frontend by calling these endpoints (e.g. from `/login` and `/signup`). Store the `token` in localStorage and include it in `Authorization: Bearer <token>` headers for protected requests.
