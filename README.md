# ⚡ Fullstack Starter Kit

<div align="center">

![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Infrastructure-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Status](https://img.shields.io/badge/Status-Deprecated-red?style=flat-square)

</div>

---

## 🛑 Project Status: Architecture Migration

> **⚠️ Important Notice**
>
> **Active development for this architecture has been discontinued.** The project is currently being migrated to a **Hexagonal Architecture** (Domain-Driven Design approach) to achieve:  
> * **Complete Decoupling:** Full isolation of business logic from external frameworks.  
> * **Infrastructure Agnosticism:** Flexibility to switch between databases or service providers seamlessly.  
> * **Test-Driven Scalability:** Enhanced support for unit and integration testing.  
>
> *This repository remains a reference for the original modular approach.*

---

## 📖 Overview

A **professional-grade boilerplate for Node.js + React**, designed to jumpstart modern web applications. The project emphasizes **modularity, security, and developer experience**, providing a solid foundation for fullstack solutions.

---

## 🧩 Key Features

### 🔐 Authentication & Security
* **Advanced Auth Flow:** Secure Sign-up, Login, and Multi-factor Authentication (2FA).  
* **Security-First:** JWT implemented with **HTTP-Only Cookies** to mitigate XSS risks.  
* **OAuth 2.0 Ready:** Google Login integrated natively, with easy expansion for other providers.  
* **Session Safety:** Automatic token rotation using Refresh Tokens.

### 🧭 Enterprise Admin Dashboard
* **User Management:** Full CRUD operations with account status control.  
* **Granular RBAC:** Role-based permissions for dynamic access control.  
* **Audit Trails:** Logging of all sensitive administrative actions.  
* **Globalization:** Native **i18n** support (English/Spanish) and Dark/Light UI modes.

---

## 🛠 System Design

### 🚀 Real-Time Notifications (WebSockets)
The system uses **WebSockets** to deliver notifications in real time.  
* Administrators can create notifications in the dashboard.  
* Active users receive these notifications instantly through the client interface.  
* WebSocket infrastructure ensures that updates are synchronized live across all connected clients.

### ⚙️ Global Configuration & Seeders
The project includes **seeders** for creating users, roles, permissions, and system configuration.  
* **Global Configuration:** Toggle core functionalities on or off (e.g., enable/disable OAuth login) without modifying the code.  
* **Role & Permission Management:** Seeded roles and permissions simplify access control setup and maintain consistency across environments.  
* **Initial Data Setup:** Seeders allow quick initialization of the application for development or testing environments.

### 🏗️ Feature-Oriented Architecture
Follows a **Screaming Architecture** pattern, where each module (`user`, `admin`, etc.) contains its own logic, models, and routes. This ensures scaling the app does not introduce regressions in unrelated modules.

---

## 🐳 Infrastructure & Deployment

The project provides a production-ready **Infrastructure-as-Code** setup. The local environment is fully orchestrated via Docker, with a pre-configured **Nginx** reverse proxy.

| Service | Technology | Role |
| :--- | :--- | :--- |
| **API** | Node.js (Express) | Main backend service |
| **Database** | MongoDB | NoSQL data store |
| **Proxy** | Nginx | Reverse proxy & load balancing |
| **Client** | React | Frontend application |
| **DevTools** | Mongo Express | Database management interface |
| **Email** | MailDev | Local SMTP for testing emails |

### 🚀 Quick Start
Local deployment is fully contained in the `/Infrastructure` folder:  
1. Ensure **Docker** is installed.  
2. Run `docker compose up -d --build`.  
3. Access the application via the Nginx entry point.

📄 For detailed setup instructions, see the [**Deployment Guide**](./Deploy.md).

---

## 🔐 Test Credentials

| Account | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@admin.es` | `11111111` | Full system control |
| **Standard User** | `user@user.es` | `11111111` | Restricted access |

---

## 📬 API Documentation

Test the API immediately using the pre-configured Postman collection:  
👉 [**Postman.json**](./Backend/Postman.json)
