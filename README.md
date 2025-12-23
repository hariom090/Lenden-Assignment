# Lenden-Assignment

---

# 🔐 Secure User Profile & Access Control System

## 📌 Project Overview

It implements a **Secure User Profile & Access Control System** focusing on **authentication, authorization, and protection of sensitive user data**.

### 🔹 Problem Statement

Build a secure identity management system that:

* Allows users to **register and log in**
* Uses **JWT (JSON Web Tokens)** for stateless authentication
* Stores sensitive information (**Aadhaar / ID number**) in **encrypted form**
* Allows only authenticated users to access their profile
* Demonstrates secure backend practices and clean frontend integration
* Documents the use of **AI-based development tools** (mandatory requirement)

### 🔹 Implementation Approach

* **Frontend** built using React (Vite) for a clean and responsive UI
* **Backend** developed using Node.js and Express
* **MongoDB** used as a persistent NoSQL database
* **AES-256 encryption** used to encrypt Aadhaar before storing in the database
* **JWT authentication** used to protect APIs
* **Jest unit tests** added for encryption/decryption logic
* AI tools were used to improve productivity, debugging, and test creation

---

## ⚙️ Technology Stack

### Frontend

* React (Vite)
* JavaScript
* Axios
* React Router DOM
* CSS (custom styling)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* crypto (AES-256 encryption)
* dotenv

### Testing

* Jest

---

## 🚀 Setup / Run Instructions

Follow the steps below to run the project locally.

---

### 🔧 Prerequisites

* Node.js **v20 LTS or higher**
* MongoDB Community Server (installed and running)
* Git (optional)

---

## ▶ Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/LenDen_assingment
JWT_SECRET=lenden_secret_key
ENCRYPTION_KEY=12345678901234567890123456789012
```

> ⚠️ `ENCRYPTION_KEY` must be exactly **32 characters** (AES-256 requirement)

4. Ensure MongoDB service is running.

5. Start backend server:

```bash
npm run dev
```

6. Expected output:

```text
MongoDB connected
Server running on port 5000
```

---

## ▶ Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

4. Open browser:

```
http://localhost:5173
```

---

## 🔗 API Documentation

### 🔐 Authentication APIs

#### 1️⃣ Register User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "name": "Hariom",
  "email": "hariom@test.com",
  "password": "password123",
  "aadhaar": "123456789012"
}
```

**Validations:**

* Aadhaar must contain **only digits**
* Aadhaar must be **exactly 12 digits**
* Email must be unique

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

#### 2️⃣ Login User

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "hariom@test.com",
  "password": "password123"
}
```

**Success Response:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

**Error Responses:**

* Email not registered
* Incorrect password

---

### 👤 Profile API (Protected)

#### 3️⃣ Get User Profile

**GET** `/api/profile`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
{
  "name": "Hariom",
  "email": "hariom@test.com",
  "aadhaar": "123456789012"
}
```

> Aadhaar is decrypted **only after successful JWT validation**.

---

## 🗄️ Database Schema

### User Collection (MongoDB)

```text
User
│
├── name        : String
├── email       : String (unique)
├── password    : String (hashed using bcrypt)
├── aadhaar     : String (AES-256 encrypted)
├── createdAt   : Date
├── updatedAt   : Date
```

### 🔐 Security Notes

* Aadhaar is **never stored in plain text**
* Encryption is applied before database insertion
* Decryption happens only for authenticated profile access

---

## 🧪 Testing

### Jest Unit Tests

* Unit tests written for **AES-256 encryption and decryption**
* Ensures correctness and data integrity

Run tests:

```bash
npm test
```

Expected result:

```text
PASS  tests/encrypt.test.js
```

---

## 🤖 AI Tool Usage Log (MANDATORY)

### AI-Assisted Tasks

The following tasks were assisted using AI-based development tools (ChatGPT):

1. Designing AES-256 encryption and decryption utility
2. Implementing JWT authentication and authorization middleware
3. Writing Jest unit tests for encryption/decryption logic
4. Debugging Node.js ES-module and Jest configuration issues
5. Improving validation logic and error handling
6. Structuring clean backend and frontend architecture

### Effectiveness Score

**Score: 4 / 5**

**Justification:**
AI tools significantly reduced development time for security utilities, testing, and debugging. Some manual configuration and debugging were still required, which helped in deeper understanding of backend workflows.

---

## 🎯 Conclusion

This project demonstrates:

* Secure backend development practices
* Proper authentication and authorization
* Encryption of sensitive user data
* Clean frontend–backend integration
* Unit testing and documentation
* Thoughtful use of AI tools

The system is **fully functional, secure, and ready for evaluation** 