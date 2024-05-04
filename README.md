# MyNoteBookBackend

### This is the backend API for the Note App, a MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to create, manage, and organize notes in folders.

## Features

### User Authentication: Secure user authentication and authorization process including signup, login, email verification, and password management.
### CRUD Operations: Users can perform CRUD (Create, Read, Update, Delete) operations on both folders and files.
### Folder Hierarchy: Users can create folders within folders to organize their notes hierarchically.
### Profile Management: Users can view and update their personal information and upload a profile picture.

## Technologies Used

### Express.js: Web application framework for Node.js used for building the API endpoints.
### MongoDB: NoSQL database used for storing user data and folder/file hierarchy.
### Mongoose: MongoDB object modeling for Node.js, used for database operations and schema validation.
### bcrypt: Library used for hashing passwords before storing them in the database.
### jsonwebtoken: Used for generating and verifying authentication tokens.
### multer: Middleware for handling multipart/form-data, used for uploading profile pictures.
### nodemailer: Node.js module for sending emails, used for sending verification emails.
### dotenv: Module for loading environment variables from a .env file into process.env.
### cookie-parser: Middleware for parsing cookies attached to the client request.
### cors: Middleware for enabling Cross-Origin Resource Sharing.
### ejs: Embedded JavaScript templates used for rendering email templates.
### uuid: Library for generating unique IDs, used for folder and file IDs.

## Installation

### Clone this repository: git clone https://github.com/LORD-JINXXX/MyNoteBookBackend.git
### Navigate to the project directory: cd MyNoteBookBackend
### Install dependencies: npm install

## Configuration

### Create a .env file in the root directory based on the provided .env.example file.
### Update the .env file with your MongoDB connection URI, JWT secret, email SMTP settings, and other configuration options.

## Usage

### Start the development server: npm start
### The server will run on the port specified in the .env file.
### Connect your frontend application to this backend API to enable note management features.

## API Endpoints

### POST /api/signup: Create a new user account.
### POST /api/login: Log in an existing user.
### GET /api/logout: Log out an existing user.
### GET /api/users/:id/verify/:token: Verify user's email address.
### POST /api/resend: Resend verification email to user's mail.
### POST /api/password-reset: Collect user's existing data and verify to execute reset passord.
### GET /api/user: Fetch all the information of an user.
### POST /api/upload: Upload user's profile picture.
### GET /api/fetchimage: Fetch user's uploaded profile picture.
### POST /api/updateinfo: Update user's personal information,
### POST /api/changepassword: Change user's existing password.

## Contributing

### Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or create a pull request.
