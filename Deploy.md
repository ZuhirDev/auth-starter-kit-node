# Índice
- [🛠️ Guía de despliegue local con Docker](#️-guía-de-despliegue-local-con-docker)
  - [📥 1. Clonar el repositorio](#-1-clonar-el-repositorio)
  - [⚙️ 2. Configurar las variables de entorno](#️-2-configurar-las-variables-de-entorno)
  - [🎨 3. Preparar el frontend](#-3-preparar-el-frontend)
  - [🐳 4. Levantar los contenedores Docker](#-4-levantar-los-contenedores-docker)
  - [🧠 5. Preparar el backend](#-5-preparar-el-backend)
  - [🌐 6. Acceder a la aplicación](#-6-acceder-a-la-aplicación)
  - [📝 Notas sobre la configuración](#-notas-sobre-la-configuración)
    - [📧 Pruebas de correo en local](#-pruebas-de-correo-en-local)
    - [🗄️ Acceso a la base de datos](#️-acceso-a-la-base-de-datos)
    - [🔌 Pruebas de la API](#-pruebas-de-la-api)

# 🛠️ Guía de despliegue local con Docker

Esta guía muestra los pasos recomendados para desplegar el proyecto en un entorno local usando Docker. Incluye preparación del frontend, arranque de la infraestructura y comprobaciones básicas.

## 📥 1. Clonar el repositorio

- Clona el repositorio y entra al directorio del proyecto.

    ```bash
    git clone https://github.com/ZuhirDev/auth-starter-kit-node.git
    cd auth-starter-kit-node
    ```

## ⚙️ 2. Configurar las variables de entorno

El archivo `.env` contiene la configuración necesaria para que la aplicación funcione correctamente.

- Copia los archivos de ejemplo para Backend y Frontend:

```bash
cp Backend/.env.example Backend/.env
```

```bash
cp Frontend/.env.example Frontend/.env
```

## 🎨 3. Preparar el frontend

El frontend requiere instalar dependencias y generar la build de producción.

- Se debe instalar las librerías necesarias del frontend.
    
    ```bash
    cd Frontend
    npm install
    ```
- Luego, compilar el código para producción.

    ```bash
    npm run build
    ```
Esto genera los archivos estáticos que el servidor usará para mostrar la interfaz.

## 🐳 4. Levantar los contenedores Docker

Se levantan los contenedores que contienen la base de datos, servidor web, Node y otros servicios necesarios.

- Se ejecuta Docker Compose para construir y correr los contenedores en segundo plano.

    ```bash
    cd Infrastructure
    docker compose up -d --build
    ```

Esto pone en marcha toda la infraestructura del proyecto.

## 🧠 5. Preparar el backend

El backend requiere instalar dependencias y compilar el código.

- Instala dependencias y ejecuta los seed dentro del contenedor `backend`:

```bash
docker compose exec backend sh -c "npm install && npm run seed"
```

## 🌐 6. Acceder a la aplicación

Una vez todo está listo y corriendo, se puede acceder a la aplicación abriendo un navegador web y visitando la dirección [http://localhost:85](http://localhost:85).

## 📝 Notas sobre la configuración

### 📧 Pruebas de correo en local
Se utiliza **MailDev** para simular el envío de correos:  
  - Interfaz web: [http://localhost:1080](http://localhost:1080)  
  - Servidor SMTP: puerto **1025**  

### 🗄️ Acceso a la base de datos
Se puede acceder mediante **Mongo Express**: [http://localhost:8081](http://localhost:8081)  
  - Usuario: `admin`  
  - Contraseña: `pass`  

### 🔌 Pruebas de la API
La API está disponible en `http://localhost:85/api` y se puede probar fácilmente con [`Postman.json`](./Backend/Postman.json) o cualquier cliente HTTP.

> 🔹 Estas herramientas son únicamente para desarrollo y pruebas locales.


