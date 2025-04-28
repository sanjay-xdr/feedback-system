# Feedback System

This repository contains both the backend and frontend for the Feedback System. Follow the steps below to set up and run the application locally.

---


https://github.com/user-attachments/assets/34607a76-8179-44ba-ae2c-acbaf237430e


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js
- **PostgreSQL**: [Download PostgreSQL](https://www.postgresql.org/)

---

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Set up the database:
   - Locate the table creation script in the `config` folder and execute it in your PostgreSQL database to initialize the required tables.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   - Rename the `.env.example` file to `.env`:
     ```bash
     mv .env.example .env
     ```
   - Add your environment-specific keys and values in the `.env` file.

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Frontend Setup

1. Navigate to the `frontend/feedback-system` directory:
   ```bash
   cd frontend/feedback-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---


Happy coding!
