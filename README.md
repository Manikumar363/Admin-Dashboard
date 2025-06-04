## Admin Panel Authentication System

A full-stack authentication system for an admin panel, featuring user registration and login with protected routes and a simple dashboard.

## Technologies Used

**Frontend:**

- React.js
- Material UI (for UI components)
- Formik & Yup (for form handling and validation)
- React Router DOM (for navigation)
- Axios (for API calls - though not explicitly used in the provided snippets, typically used for this)

**Backend:**

- Node.js & Express.js
- MongoDB (with Mongoose as ODM)
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT authentication)
- dotenv (for environment variables)
- Javascript 

## Features

- User registration with Name, Email, Date of Birth, and Password.
- User login with Email and Password.
- API endpoints for `/register` and `/login`.
- JSON Web Token (JWT) based authentication.
- Storing JWT and user information in `localStorage` on the frontend.
- Protected routes (e.g., Dashboard) accessible only after login.
- A static dashboard page displaying user management data in a table.

## Setup and Installation

Follow these steps to set up and run the project locally.

**1. Clone the repository:**

```bash
# Assuming your project is in a Git repository
# Replace with your repository URL
git clone <your_repository_url>
cd Admin-Panel
```

**2. Backend Setup:**

Navigate to the backend directory and install dependencies.

```bash
cd backend
npm install
# or yarn install
```

Create a `.env` file in the `Admin-Panel/backend` directory with the following content:

```env
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<A strong, random secret key>
```

Replace `<Your MongoDB Connection String>` with your actual MongoDB connection string.
Replace `<A strong, random secret key>` with a secure random string (you can generate one using `node -c "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

**3. Frontend Setup:**

Navigate to the frontend directory and install dependencies.

```bash
cd ../frontend
npm install
# or yarn install
```

The frontend uses environment variables implicitly handled by Create React App (if used). No explicit `.env` file is needed for basic setup unless you have custom environment variables beyond what CRA handles. The backend URL is currently hardcoded in `authService.js`, you might want to make this configurable via environment variables in a production application.

## Running the Project

**1. Start the Backend Server:**

Navigate to the backend directory and run the start script.

```bash
cd Admin-Panel/backend
npm start
# or yarn start
```

The backend server should start, typically on `http://localhost:5000` (check `Admin-Panel/backend/src/index.js` for the exact port).

**2. Start the Frontend Development Server:**

Navigate to the frontend directory and run the start script.

```bash
cd ../frontend
npm start
# or yarn start
```

The frontend application should open in your browser, typically at `http://localhost:3000`.

## Usage

- Open your browser to `http://localhost:3000`.
- Use the "SIGN UP" link to register a new user account.
- After successful registration, you will be redirected to the login page.
- Use the "SIGN IN" link or the automatically redirected login page to log in with your registered credentials.
- Upon successful login, you will be directed to the Admin Dashboard (a protected route).
- The Dashboard displays a static user management table.
- Click the "LOGOUT" button in the header to log out and return to the login page.
