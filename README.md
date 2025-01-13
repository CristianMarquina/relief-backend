# Introduction

Relief is a video player application that allows users to search for videos, add them to their history, and create bookmarks for easy access. This README provides instructions for setting up and running the application in a Docker environment.

# Backend Overview

This backend is developed using Node.js, Express, and PostgreSQL as the database. Sequelize is employed as an Object-Relational Mapper (ORM) to interact with the database. Migrations have been implemented to establish the History and Bookmark entities.

The backend adheres to an MVC (Model-View-Controller) architecture, with a modular design for each entity. This approach promotes maintainability and scalability.

Note: The current repository includes a .env file for demonstration purposes only. In a production environment, it is strongly recommended to manage sensitive information such as database credentials using environment variables or a secrets management service to maintain security.
#Prerequisites

Docker installed and running on your system

# Clone the Repository:

git clone https://github.com/CristianMarquina/relief-backend.git
cd relief-backend

# Build the Docker Images:

docker-compose build
This command builds Docker images for both the backend and database services.

# Run the Application:

docker-compose up -d
The -d flag runs the containers in detached mode, allowing them to run in the background.
