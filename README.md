# Todo List Application

A modern, responsive Todo List application built with React, TypeScript, and Redux Toolkit. This project demonstrates best practices in React development, state management, and testing.

## Features

- User authentication (login/logout)
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Completed, Pending)
- Responsive design for mobile and desktop
- Persistent storage using localStorage

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Vite as the build tool
- Jest and React Testing Library for unit testing
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Login Credentials

For demonstration purposes, you can use the following credentials to log in:

- Email: m@gmail.com
- Password: 123

## Project Structure

- `src/`: Source code
  - `components/`: React components
  - `redux/`: Redux store and slices
  - `hooks/`: Custom React hooks
  - `assets/`: Static assets (images, icons)
- `tests/`: Test files

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run lint`: Lints the project files
- `npm run preview`: Previews the production build
- `npm run test`: Runs the test suite
- `npm run test:watch`: Runs tests in watch mode

## Deployment

This project is configured for easy deployment to Vercel. The `vercel.json` file ensures proper routing for a single-page application.
