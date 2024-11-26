
# MERN Stack User Management Application with Docker

## Project Overview

This is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing users. The app includes two primary features:

1. Creating New Users
2. Displaying a List of Users

### Key Highlights:
- User Management: Interactive interface for viewing and creating users.
- Dockerized Application: Fully containerized setup for easy deployment and scalability.

## Technologies Used
- Frontend: React.js (with TypeScript)
- Backend: Express.js (Node.js)
- Database: MongoDB
- Containerization: Docker, Docker Compose
- API Validation: Mongoose (backend validation)
- Testing: Jest and React Testing Library

## Features
- User List: Display users in a table with pagination.
- Create User: A form to create a new user with fields for:
  - First Name: Accepts alphabets only, max length: 100 characters.
  - Last Name: Accepts alphabets only, max length: 100 characters.
  - Email: Valid email format, must be unique.
- Dockerized Setup: Seamless integration of frontend, backend, and MongoDB using Docker Compose.
- Unit Testing: Comprehensive tests using Jest for both frontend and backend.
- To make the application secure implemented below features,
    - Logging
    - Sanitize incoming request data to protect from XSS
    - Protect against NoSQL injection attacks
    - secure headers

## Setup Instructions. 
- Below is the folder structure of the project
user-management/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── ...
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── ...
├── docker-compose.yml
├── README.md

### Development Setup
#### Frontend:
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

#### Backend:
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    npm start
    ```
### Running Tests
#### Backend:
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Run tests:
    ```bash
    npm test
    ```
#### Frontend:
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Run tests:
    ```bash
    npm test
    ```
## Prerequisites
To run this project locally, ensure the following are installed on your machine:
- Docker (including Docker Compose)

## Docker Setup
1. Build and run the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```
2. Access the application:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5000](http://localhost:5000)

3. Stop the application:
    ```bash
    docker-compose down
    ``` # user-management
