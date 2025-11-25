Overview

This frontend provides a simple interface for creating tasks and sending them to the backend API.
It's built using HTML, CSS, and JavaScript, without additional frameworks, to keep it lightweight and easy to maintain.

Features

Form for creating new tasks
Client-side validation
API connectivity to the backend service
User-friendly UI design suitable for internal tools

Setup

1. Install dependencies (if any)

If you're using a simple static setup, nothing is required.
If using a dev server (e.g. Vite), run:

npm install
npm run dev

2. Configure API URL
   Check the file where API requests are made (e.g. api.js or inside the form handler) and ensure the backend URL is correct:

const API_URL = "http://localhost:3000/tasks";

Usage

Start the backend (npm run dev in its project)
Start the frontend (open index.html, or run the dev server)
Fill in the form and submit a task
If successful, the task will be sent to the backend and stored in the database

Project Structure Example
frontend/
│── index.html
│── styles.css
│── script.js
│── assets/

Development Notes
Make sure CORS is enabled on the backend for your frontend's port (usually 3001 or 5173)
If you're using Vite, the frontend will run on:
http://localhost:3001

Error messages from the backend will appear to the user via form feedback.
