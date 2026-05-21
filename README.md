# Task Management Tool

A modern, full-stack task management application featuring secure user authentication, profile customization, notification systems, and a fully featured administrative dashboard.

---

## 🚀 Features

### **User Portal**
- **Security**: Complete signup and login system secured using bcrypt password hashing and JSON Web Tokens (JWT).
- **Task Management**: Create, view, update, and delete personalized tasks.
- **Real-Time Notifications**: Receive live alerts and broadcasted updates from administrators.
- **Profile Customization**: Edit profile details and update account configurations.

### **Admin Portal**
- **Admin Dashboard**: Specialized interface for managing application-wide actions.
- **User Management**: View and monitor registered users in the workspace.
- **Broadcasting Engine**: Broadcast urgent announcements, custom messages, or bulk tasks directly to all users simultaneously.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Sass (SCSS) Modules, React Router, React Hot Toast
- **Backend**: Node.js, Express.js, JWT, Cookie Parser, Cors, Morgan
- **Database**: MongoDB & Mongoose ORM

---

## 🔑 Demo Credentials (For Testing)

To log in and experience the administrative capabilities of the application:
- **Role**: Administrator
- **Email**: `admin123@gmail.com`
- **Password**: `admin123`

---

## 📦 Project Structure

- **`backend`**: Node.js & Express server connected to MongoDB Atlas.
- **`frontend`**: React client built and bundled with Vite.

---

## ⚙️ Setup & Running Instructions

### 1. Backend Server Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create or configure your `.env` file in the `backend` directory:
   ```env
   PORT=8000
   DB_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:8000` and automatically connect to MongoDB.

### 2. Frontend Client Setup

1. Open a new terminal tab/window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create or configure your `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000` by default.

---

## ⚠️ Troubleshooting

- **Error: `TypeError: Cannot read properties of undefined (reading 'prototype')` (in `buffer-equal-constant-time`)**
  - **Cause**: Node.js v25+ removed `SlowBuffer`, which crashed older versions of `jsonwebtoken` (v8).
  - **Resolution**: Upgraded `jsonwebtoken` to `^9.0.3` in the backend.

- **Error: `EADDRINUSE: address already in use :::8000` (or `:::3000`)**
  - **Cause**: Port 8000 or 3000 is already being used by a stale process.
  - **Resolution**: Find and kill the stale process:
    - *To find the process*: `lsof -i :8000` or `lsof -i :3000`
    - *To kill the process*: `kill -9 <PID>`
