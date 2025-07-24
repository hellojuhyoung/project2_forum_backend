<div id="top">

<!-- HEADER STYLE: CLASSIC -->

<div align="center">

<img src="https://placehold.co/150x150/8A2BE2/FFFFFF?text=Backend+Logo" alt="Project Logo" width="150">

JL Forum Backend
The robust Node.js/Express.js backend for the JL Forum application, handling user authentication, post management, image processing, and payment functionalities, deployed on AWS Elastic Beanstalk.

<!-- BADGES -->

<!-- You can customize these badges. The ones generated are based on detected technologies. -->

<!-- Add more relevant badges like deployment status, license, etc. -->

Built with the following key technologies:

<img src="https://img.shields.io/badge/Node.js-339933.svg?style=flat-square&logo=Node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=flat-square&logo=MySQL&logoColor=white" alt="MySQL">
<img src="https://img.shields.io/badge/AWS_RDS-52B0E7.svg?style=flat-square&logo=Amazon-RDS&logoColor=white" alt="AWS RDS">
<img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=flat-square&logo=Sequelize&logoColor=white" alt="Sequelize">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/AWS_Elastic_Beanstalk-232F3E.svg?style=flat-square&logo=Amazon-AWS&logoColor=white" alt="AWS Elastic Beanstalk">
<img src="https://img.shields.io/badge/sharp-99CC00.svg?style=flat-square&logo=sharp&logoColor=white" alt="sharp">
<img src="https://img.shields.io/badge/Passport.js-34E27A.svg?style=flat-square&logo=Passport&logoColor=white" alt="Passport.js">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat-square&logo=dotenv&logoColor=black" alt=".ENV">

</div>
<br>

Table of Contents
Overview

Features

Project Structure

Getting Started

Prerequisites

Installation

Configuration

Usage

Testing

Deployment

Roadmap

License

Acknowledgments

Overview
This repository contains the backend for the comprehensive JL Forum application. Built with Node.js and Express.js, it provides a robust API for user authentication, post management, image handling, and payment processing. The backend is designed for scalability and deployed on AWS Elastic Beanstalk, utilizing a MySQL database (potentially on AWS RDS) for data persistence.

Features
User Authentication: Secure user registration, login, and session management using Passport.js, including social logins (Kakao, Naver, Google).

Post Management: API endpoints for creating, viewing, editing, and deleting posts.

Image Uploads & Processing: Handles image uploads, including thumbnail generation and optimized storage using sharp.

Interactive Content: API support for liking posts.

Categorization: Manages post categories for content organization.

Payment Integration: Backend logic for payment functionalities (e.g., Toss Payments).

API Documentation: Integrated Swagger for clear API endpoint documentation.

Database Management: Utilizes Sequelize ORM for robust MySQL database interactions, including migrations.

Project Structure
This repository focuses solely on the backend/ component of the JL Forum application.

.
├── app.js
├── auth/
│ ├── AuthController.js # Handles user authentication logic (login, register)
│ ├── SocialAuthController.js # Handles social login (Kakao, Naver, Google)
│ └── passportConfig.js # Passport.js strategy configuration
├── config/
│ ├── config.js # Application configuration settings
│ └── config.json # Database configuration for Sequelize CLI
├── controllers/
│ ├── CategoryController.js # Logic for category-related operations
│ ├── ImageController.js # Logic for image handling and uploads
│ ├── LikeController.js # Logic for post liking/unliking
│ ├── PaymentController.js # Logic for payment processing
│ ├── PostController.js # Logic for post CRUD operations and image extraction
│ └── UserController.js # Logic for user profile management
├── forum-backend-env.env.yml # Elastic Beanstalk environment configuration
├── middlewares/
│ ├── AuthMiddleware.js # Middleware for authentication and authorization
│ └── sessionMiddleware.js # Session management middleware
├── migrations/ # Sequelize database migration files
│ ├── 20250428064947-create-user.js
│ ├── 20250428090000-create-category.js
│ ├── 20250428094449-create-post.js
│ ├── 20250522070405-create-post-images.js
│ └── 20250527103428-create-likes.js
├── models/
│ ├── CategoryModel.js # Sequelize model for Categories
│ ├── LikeModel.js # Sequelize model for Likes
│ ├── PostImagesModel.js # Sequelize model for Post Images
│ ├── PostModel.js # Sequelize model for Posts
│ ├── UserModel.js # Sequelize model for Users
│ └── index.js # Sequelize model initialization and associations
├── openssl_san.cnf # OpenSSL configuration for SSL certificates
├── package-lock.json
├── package.json
├── routes/
│ ├── AuthRoute.js # API routes for authentication
│ ├── CategoryRoute.js # API routes for categories
│ ├── ImageUploadRoute.js # API routes for image uploads
│ ├── LikeRoute.js # API routes for likes
│ ├── PaymentRoute.js # API routes for payments
│ ├── PostRoute.js # API routes for posts
│ └── UserRoute.js # API routes for user profiles
├── swagger/
│ └── swagger-output.json # Generated Swagger API documentation
│ # Note: This file is typically generated and should not be manually edited.
├── swagger.js # Swagger auto-generation configuration
└── utils/
├── data/ # (Potentially) placeholder data or utility data
├── imageProcess.js # Image resizing and saving utilities (using sharp)
├── jwtUtils.js # JSON Web Token utilities
├── payments/
│ └── tosspayments.js # Toss Payments integration logic
└── seedCategories.js # Script to seed initial categories into the database

Getting Started
Follow these instructions to get the backend of the project up and running on your local machine for development and testing purposes.

Prerequisites
Ensure you have the following installed on your system:

Node.js: Version 18.x or higher (LTS recommended)

npm (Node Package Manager): Comes with Node.js

MySQL: Database server (e.g., local MySQL instance or AWS RDS endpoint)

Git: For cloning the repository

Installation
Clone the repository:
If this backend is a standalone repository:

git clone https://github.com/hellojuhyoung/project2_forum_backend.git
cd project2_forum_backend

If this backend is a subfolder within a larger monorepo (and this README is for that subfolder):

git clone https://github.com/hellojuhyoung/project2_forum_backend.git
cd project2_forum_backend/backend # Adjust path if different

(If this is a standalone backend repo, use the first git clone command. If it's part of a larger project, use the second and adjust the cd path if backend is nested differently.)

Install Backend Dependencies:
Navigate to the backend directory (if not already there) and install dependencies:

npm install

Configuration
Environment Variables
Create a .env file in your backend/ directory. Refer to the .env.example file in your project root for required variables.

backend/.env example:

PORT=5001
DB_HOST=localhost # Or your RDS endpoint
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key

# Add API keys for social logins (Kakao, Naver, Google)

KAKAO_CLIENT_ID=...
KAKAO_CLIENT_SECRET=...
NAVER_CLIENT_ID=...
NAVER_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Add Toss Payments secret key

TOSS_PAYMENTS_SECRET_KEY=...

Database Setup
Create a MySQL database:

CREATE DATABASE forum_db

If using AWS RDS, ensure your RDS instance is set up and accessible.

Run database migrations:
Navigate to the backend directory and run Sequelize migrations to set up your database schema:

npx sequelize db:migrate

Seed initial categories (Optional):
If you have a seedCategories.js script, you can run it to populate initial data:

node utils/seedCategories.js

Usage
To run the backend server locally:

Start the Backend Server:
Navigate to the backend directory:

npm start # Or 'npm run dev' if you have a dev script with nodemon

The backend API will typically run on http://localhost:5001.

Testing
The project uses the npm test command for backend testing.

Run Backend Tests:
Navigate to the backend directory:

cd backend
npm test

(Ensure you have configured your backend tests in package.json.)

Deployment
This backend application is designed for deployment on AWS Elastic Beanstalk, providing a managed environment for Node.js applications.

Deployment typically involves:

Packaging your backend code.

Creating and configuring an Elastic Beanstalk environment (Node.js platform).

Connecting your Elastic Beanstalk environment to an AWS RDS MySQL instance.

Setting up environment variables directly within the Elastic Beanstalk environment.

Deploying your application package.

Roadmap
Task 1: Implement feature one.

Task 2: Implement feature two.

Task 3: Implement feature three.

Future Enhancements (Backend-focused):

Implement real-time notifications for new posts/comments.

Optimize API performance and database queries.

Add robust logging and monitoring.

Expand moderation tools for content.

Integrate with more third-party services as needed.

License
JL Forum Backend is protected under the MIT License. For more details, refer to the LICENSE file in the repository.

Acknowledgments
Credit to eli64s/readme-ai for the README generation tool.

Thanks to all contributors, libraries, and resources that made this project possible.

<div align="right">

</div>
