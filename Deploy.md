# Table of Contents
- [🛠️ Local Deployment Guide with Docker](#️-local-deployment-guide-with-docker)
  - [📥 1. Clone the Repository](#-1-clone-the-repository)
  - [⚙️ 2. Configure Environment Variables](#️-2-configure-environment-variables)
  - [🎨 3. Prepare the Frontend](#-3-prepare-the-frontend)
  - [🐳 4. Spin up Docker Containers](#-4-spin-up-docker-containers)
  - [🧠 5. Set up the Backend](#-5-set-up-the-backend)
  - [🌐 6. Access the Application](#-6-access-the-application)
  - [📝 Configuration Notes](#-configuration-notes)
    - [📧 Local Email Testing](#-local-email-testing)
    - [🗄️ Database Access](#️-database-access)
    - [🔌 API Testing](#-api-testing)

---

# 🛠️ Local Deployment Guide with Docker

This guide details the recommended workflow for deploying the project in a local environment using Docker. It covers frontend preparation, infrastructure provisioning, and initial setup verification.

## 📥 1. Clone the Repository

- Clone the repository and navigate into the project's root directory:

    ```bash
    git clone https://github.com/ZuhirDev/auth-starter-kit-node
    cd auth-starter-kit-node
    ```
---

## ⚙️ 2. Configure Environment Variables

The `.env` file contains the essential configuration required for the application to function correctly.

- Copy the example environment files for both the Backend and Frontend:
```bash
cp Backend/.env.example Backend/.env
```

```bash
cp Frontend/.env.example Frontend/.env
```
---

## 🎨 3. Prepare the Frontend

The frontend requires dependency installation and a production-ready build.

- Install the necessary frontend libraries:
    
    ```bash
    cd Frontend
    npm install
    ```
- Compile the code for production:

    ```bash
    npm run build
    ```
This generates the static assets that the server will use to serve the user interface.

---


## 🐳 4. Spin up Docker Containers

This process launches the containers responsible for the database, web server, Node.js, and other services.

- Run Docker Compose to build and start the containers:
    ```bash
    cd Infrastructure
    docker compose up -d --build
    ```

This initializes the entire project infrastructure.

---


## 🧠 5. Set up the Backend

The backend setup involves dependency installation and database seeding.

- Install dependencies and execute the seeders directly within the `backend` container:

```bash
docker compose exec backend sh -c "npm install && npm run seed"
```

---

## 🌐 6. Access the Application

Once the services are fully operational, you can access the application by navigating to [http://localhost:85](http://localhost:85) in your web browser.

---

## 📝 Configuration Notes

### 📧 Local Email Testing
The project uses **MailDev** to intercept and simulate email delivery:  

  - Web Interface: [http://localhost:1080](http://localhost:1080)  
  - SMTP Server Port: **1025**

### 🗄️ Database Access
Manage the data through **Mongo Express**: [http://localhost:8081](http://localhost:8081)  

  - Username: `admin`  
  - Password: `pass`  

### 🔌 API Testing
The API is exposed at `http://localhost:85/api`. You can test the endpoints using the provided [`Postman.json`](./Backend/Postman.json) collection or any standard HTTP client.

> 🔹 *Note: These tools and credentials are intended strictly for local development and testing purposes.*