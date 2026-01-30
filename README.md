# Starter Kit Fullstack ⚡

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Docker](https://img.shields.io/badge/Infrastructure-Docker-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)

## 🛑 Estado del proyecto

> **Nota importante**  
> Este proyecto **no continuará su desarrollo en esta arquitectura**.  
>  
> Actualmente se encuentra en proceso de **migración a una nueva versión basada en Arquitectura Hexagonal**, con el objetivo de:
> - Desacoplar completamente la lógica de negocio de la infraestructura  
> - Hacer el sistema **agnóstico al tipo de base de datos**  
> - Mejorar la mantenibilidad, testabilidad y escalabilidad a largo plazo  
>  
> Este repositorio queda como **referencia del enfoque inicial**, mientras que el desarrollo activo continuará en el nuevo proyecto.


**Un kit de inicio completo para proyectos Node.js + React**, diseñado para acelerar el desarrollo de aplicaciones modernas con una arquitectura modular, escalable y fácilmente reutilizable.

---

## 🧩 Funcionalidades principales

### 🔐 Autenticación y usuarios
- 🧾 Registro, inicio y cierre de sesión  
- 🔄 Recuperación y actualización de contraseñas  
- 📧 Verificación de correo electrónico  
- 🔒 Autenticación en dos factores (2FA)  
- ♻️ Refresh Tokens  
- 🌍 Inicio de sesión con Google (OAuth 2.0) — extensible a otros proveedores  
- 🛡️ Protección de rutas mediante permisos  

### 🧭 Panel de Administración
- 👥 Gestión de usuarios: crear, editar, eliminar, activar/desactivar  
- 🧩 Roles y permisos dinámicos  
- 📜 Logs de auditoría para acciones sensibles
- 🌗 Modo claro / oscuro  
- 🌐 Soporte multilenguaje (inglés y español)

---

## 🏗 Arquitectura y Gestión de Roles / Permisos

El proyecto utiliza una **arquitectura modular y escalable**, en la que cada funcionalidad (feature) es independiente y reutilizable, tanto en el backend como en el frontend.  
Esto permite mantener y extender el sistema sin afectar otras partes del código.

### 🔒 Roles y Permisos
La autorización se gestiona **exclusivamente a través de permisos**, mientras que los **roles actúan como agrupaciones de permisos**.

> Actualmente los permisos se almacenan en el token, pero próximamente se gestionarán a través de un sistema de caché para reflejar los cambios de manera inmediata.

Este enfoque centraliza la autorización en los **permisos del usuario**, garantizando un control granular, flexible y escalable.

---

## 🐳 Dockerización

El proyecto está completamente **dockerizado** para facilitar su despliegue en cualquier entorno, evitando configuraciones manuales.  

El archivo [`docker-compose.yml`](./Infrastructure/docker-compose.yml) gestiona los siguientes contenedores:

- 🟢 **Backend:** servidor Node.js con Express  
- 🟣 **Base de datos:** MongoDB  
- 🟠 **Mongo Express:** interfaz web para la administración de MongoDB  
- 🔵 **Nginx:** proxy inverso optimizado para producción  
- 🟡 **Frontend:** aplicación React lista para despliegue  
- ✉️ **MailDev:** servidor SMTP para pruebas de correo electrónico  

Con esta configuración puedes levantar todo el entorno, manteniendo consistencia entre desarrollo, pruebas y producción.  

📄 Para más detalles sobre instalación, configuración y despliegue, consulta el archivo [`Despliegue.md`](./Deploy.md).

---

## 🔐 Credenciales de acceso para pruebas

| 📧 Email        | 🔑 Contraseña | 🧾 Descripción |
|-----------------|---------------|----------------|
| admin@admin.es  | 11111111      | Usuario administrador. Puede gestionar usuarios, roles y permisos. |
| user@user.es    | 11111111      | Usuario estándar. El administrador puede asignarle roles o permisos adicionales. |

---

## 📬 Uso con Postman

Se incluye un archivo [`Postman.json`](./Backend/Postman.json), una colección preconfigurada para Postman que permite probar el backend de forma rápida y sencilla.
