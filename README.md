# Task Management Tool

A modern task management application built using the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

- **`backend`**: Node.js & Express server connected to MongoDB.
- **`frontend`**: React client built with Vite.

---

## Prerequisites

Before running the application, make sure you have:
- [Node.js](https://nodejs.org/) installed (v16+ recommended).
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.

---

## Setup & Running Instructions

### 1. Backend Server Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Check the `.env` file configuration (a default configuration is already provided):
   ```env
   PORT=8000
   DB_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000, http://localhost:3001
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:8000` and automatically connect to the MongoDB instance.

### 2. Frontend Client Setup

1. Open a new terminal tab/window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Check the `.env` file configuration (a default configuration is already provided):
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000` by default.

---

## Troubleshooting

- **Error: `TypeError: Cannot read properties of undefined (reading 'prototype')` (in `buffer-equal-constant-time`)**
  - **Cause**: Node.js v25+ removed `SlowBuffer`, which crashed older versions of `jsonwebtoken` (v8).
  - **Resolution**: Upgraded `jsonwebtoken` to `^9.0.3` in the backend.

- **Error: `EADDRINUSE: address already in use :::8000` (or `:::3000`)**
  - **Cause**: Port 8000 or 3000 is already being used by a stale process.
  - **Resolution**: Find and kill the stale process:
    - *To find the process*: `lsof -i :8000` or `lsof -i :3000`
    - *To kill the process*: `kill -9 <PID>`
