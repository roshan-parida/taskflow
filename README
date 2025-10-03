# TaskFlow 🚀

### 💡 Project Overview

**TaskFlow** is a modern, performance-optimized task management application designed for both individuals and teams. Built with the **MERN stack (MongoDB, Express, React, Node.js)**, it provides a beautiful, intuitive interface for organizing, tracking, and managing project tasks efficiently with real-time updates.

## ✨ Key Features

| Feature                         | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| 🔐 **Secure Authentication**    | JWT-based authentication with secure token management   |
| 📱 **Responsive Design**        | Seamless experience across all devices with TailwindCSS |
| 🎯 **Complete CRUD Operations** | Create, read, update, and delete tasks effortlessly     |
| 🏷️ **Smart Categorization**     | Organize tasks with custom status and priority levels   |
| 🔍 **Advanced Search & Filter** | Quickly find tasks with powerful filtering capabilities |
| ⚡ **Real-time Updates**        | Instant synchronization for collaborative work          |

## 🛠️ Tech Stack

### Frontend (Client)

| Technology                    | Purpose                           |
| ----------------------------- | --------------------------------- |
| **React** with **TypeScript** | Type-safe component development   |
| **Vite**                      | Fast build tool and dev server    |
| **TailwindCSS**               | Utility-first CSS framework       |
| **React Hook Form**           | Efficient form management         |
| **Axios**                     | HTTP client for API communication |

### Backend (API Server)

| Technology                    | Purpose                              |
| ----------------------------- | ------------------------------------ |
| **Node.js** & **Express**     | Server runtime and web framework     |
| **MongoDB** with **Mongoose** | Database with object modeling        |
| **JWT** & **Bcrypt**          | Authentication and password security |
| **Express Validator**         | Input validation and sanitization    |

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v16.x or higher)
-   **MongoDB** (Local instance or MongoDB Atlas)
-   **Git**

### Installation & Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/taskflow.git
    cd taskflow
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

3. **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Environment Configuration**

    **Backend** (`/backend/.env`):

    ```env
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_long_and_secure_secret
    JWT_EXPIRES_IN=7d
    FRONTEND_URL=http://localhost:5173
    ```

    **Frontend** (`/frontend/.env`):

    ```env
    VITE_API_BASE=http://localhost:8080/api
    ```

### Running the Application

1. **Start Backend Server** (from `/backend`)

    ```bash
    npm run dev
    # Server running on http://localhost:8080
    ```

2. **Start Frontend Development Server** (from `/frontend`)
    ```bash
    npm run dev
    # App available at http://localhost:5173
    ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login`  | User login        |

### User Management

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `GET`  | `/api/users/profile` | Get user profile    |
| `PUT`  | `/api/users/profile` | Update user profile |

### Task Management

| Method   | Endpoint         | Description                    |
| -------- | ---------------- | ------------------------------ |
| `GET`    | `/api/tasks`     | Get all tasks (with filtering) |
| `POST`   | `/api/tasks`     | Create new task                |
| `GET`    | `/api/tasks/:id` | Get specific task              |
| `PUT`    | `/api/tasks/:id` | Update task                    |
| `DELETE` | `/api/tasks/:id` | Delete task                    |
