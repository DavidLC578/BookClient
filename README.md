# Frontend Books - React Application

## Description
Frontend Books is a React-based web application that interacts with a Laravel backend to manage books and authors. It provides a user-friendly interface for viewing, adding, updating, and deleting books.

## Features
- React Router for navigation
- Fetch API to communicate with the Laravel backend
- Authentication system with JWT
- Responsive UI with modern styling
- CRUD operations for books and authors

## Installation
### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/DavidLC578/frontend-books.git
   cd frontend-books
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file to configure the API URL:
   ```sh
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```sh
   npm run start
   ```

## Usage
1. Register or log in to access the application.
2. View the list of books and authors.
3. Add, update, or delete books (if authenticated).

## API Configuration
Ensure the backend (`backend-books`) is running and accessible at the URL set in `.env`.

## License
This project is open-source and available under the [MIT License](LICENSE.md).

