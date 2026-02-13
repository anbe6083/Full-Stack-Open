# Full Stack Open

This repository contains project work for a full-stack application, likely as part of the Full Stack Open course curriculum. It includes a 'bloglist' application with a React frontend and a Node.js backend.

## Goal of this project

Goal of this project is to create a full stack application including: frontend and backend development, unit testing, try out a new E2E testing framework (Playwright), state management using Redux, and deploying the application using Render.

## Project Structure

The repository is organized into two main parts:

- `/bloglist-frontend`: Contains the React frontend application created with Vite.
- `/blog-npm-projects`: Contains the Node.js/Express backend for the bloglist application.

## Getting Started

To get the application running locally, you will need to start both the backend server and the frontend development server in separate terminal windows.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Backend (Bloglist API)

1.  **Navigate to the backend directory:**

    ```bash
    cd blog-npm-projects
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:3003` (or the port defined in your environment variables).

### Frontend (React App)

1.  **In a new terminal, navigate to the frontend directory:**

    ```bash
    cd bloglist-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or another port specified by Vite).


