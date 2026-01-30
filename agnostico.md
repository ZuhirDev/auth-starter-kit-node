# Proyecto Backend Agnóstico a Base de Datos (MySQL y MongoDB)

Este proyecto tiene como objetivo proporcionar un backend en **Node.js** usando **Express**, que sea **agnóstico a la base de datos**. Es decir, que podamos usar **MySQL** o **MongoDB** como base de datos sin tener que modificar la lógica de negocio o el controlador de la API.

La lógica de acceso a la base de datos está **abstraída** en repositorios, y la decisión sobre qué base de datos utilizar (MySQL o MongoDB) se toma dinámicamente en el **UserService**, lo que hace que los controladores no tengan que preocuparse por ello.


## Descripción de Archivos y Funcionalidad

### 1. `app.js` - Configuración Básica de Express

Este es el archivo principal donde se configura el servidor **Express** y se conecta a la base de datos según lo que esté configurado en el archivo `.env`.

**Funcionalidad**:
- Configura **Express** para manejar las solicitudes HTTP.
- Conecta con la base de datos según el tipo especificado en la variable de entorno `DB_TYPE` (puede ser `mongo` o `mysql`).
- Usa las rutas definidas en `userRoutes.js`.

### 2. `repositories/UserRepository.js` - Interfaz de Repositorio

Este archivo define una clase abstracta que sirve como **interfaz** para los repositorios de base de datos. Cada repositorio de base de datos (MySQL o MongoDB) debe implementar los métodos definidos aquí.

**Métodos definidos**:
- `createUser(email, password)`: Crea un nuevo usuario.
- `findUserByEmail(email)`: Busca un usuario por su correo electrónico.

### 3. `repositories/MySQLUserRepository.js` - Repositorio para MySQL

Este archivo implementa la interfaz `UserRepository` para interactuar con una base de datos **MySQL** usando **Prisma**.

**Funcionalidad**:
- Implementa los métodos `createUser` y `findUserByEmail` para interactuar con la base de datos MySQL utilizando Prisma.
- Realiza la verificación de si el usuario ya existe antes de crearlo.
- Utiliza **bcrypt** para cifrar la contraseña antes de almacenarla.

### 4. `repositories/MongoUserRepository.js` - Repositorio para MongoDB

Este archivo implementa la interfaz `UserRepository` para interactuar con una base de datos **MongoDB** usando **Mongoose**.

**Funcionalidad**:
- Implementa los métodos `createUser` y `findUserByEmail` para interactuar con la base de datos MongoDB utilizando Mongoose.
- Realiza la verificación de si el usuario ya existe antes de crearlo.
- Utiliza **bcrypt** para cifrar la contraseña antes de almacenarla.

### 5. `services/UserService.js` - Lógica de Negocio

Este archivo contiene la **lógica de negocio** para interactuar con los repositorios. Decide qué repositorio usar (MySQL o MongoDB) en función de la configuración de la variable de entorno `DB_TYPE`.

**Funcionalidad**:
- Lee la variable de entorno `DB_TYPE` y decide qué repositorio usar.
- Proporciona métodos como `registerUser` y `findUserByEmail` que delegan el trabajo al repositorio correspondiente.

### 6. `controllers/UserController.js` - Controlador

Este archivo maneja las solicitudes HTTP de la API. El controlador **no sabe nada sobre la base de datos**. Simplemente llama al servicio de usuario para ejecutar la lógica de negocio y devuelve las respuestas.

**Funcionalidad**:
- Contiene los controladores para las rutas `/register` y `/:email` (registro de usuario y obtención de usuario por correo).
- Utiliza el **UserService** para interactuar con los datos.

### 7. `routes/userRoutes.js` - Rutas de Usuario

Este archivo define las rutas de la API para las operaciones relacionadas con los usuarios, como el registro y la búsqueda por correo electrónico.

**Funcionalidad**:
- Define las rutas para el registro de usuario (`POST /api/users/register`) y la búsqueda de usuario por correo electrónico (`GET /api/users/:email`).
- Redirige las solicitudes a los métodos correspondientes en el controlador `UserController`.

---

## Flujo de Trabajo del Proyecto

### 1. Decisión de la Base de Datos:
- El archivo **UserService.js** es el encargado de decidir qué repositorio usar (MongoDB o MySQL) basándose en la variable de entorno `DB_TYPE`.
- Si `DB_TYPE` es `mongo`, el repositorio de MongoDB (`MongoUserRepository`) será utilizado.
- Si `DB_TYPE` es `mysql`, el repositorio de MySQL (`MySQLUserRepository`) será utilizado.

### 2. Lógica de Negocio:
- El **UserService** contiene la lógica de negocio para crear un usuario y buscar un usuario por correo electrónico.
- El controlador **UserController** delega la lógica a **UserService**, lo que permite que el controlador sea completamente agnóstico sobre qué base de datos se utiliza.

### 3. Controlador:
- El **UserController** maneja las solicitudes HTTP y delega el trabajo al **UserService**.
- No tiene conocimiento de qué base de datos está siendo utilizada. Solo se enfoca en manejar las respuestas de la API (por ejemplo, enviando un mensaje de éxito si el usuario fue creado correctamente o un mensaje de error si algo falla).

### 4. Repositorios:
- Los repositorios (`MySQLUserRepository` y `MongoUserRepository`) son responsables de la interacción con la base de datos.
- Ambos implementan la misma interfaz, garantizando que los métodos `createUser` y `findUserByEmail` estén disponibles de manera consistente, independientemente de si estamos usando MySQL o MongoDB.

### 5. Configuración de Base de Datos:
- La base de datos utilizada se define mediante la variable de entorno `DB_TYPE`. Esto permite que el código sea flexible y se pueda cambiar entre diferentes tipos de bases de datos sin modificar el código de los controladores o el servicio.

---

## Conclusión

Este enfoque permite tener un backend flexible que puede trabajar con diferentes tipos de bases de datos, como **MySQL** y **MongoDB**, sin necesidad de modificar la lógica de negocio o los controladores. La abstracción a través de los repositorios y la decisión de qué base de datos usar en el **UserService** facilita la escalabilidad y el mantenimiento del código. Esto hace que el proyecto sea más fácil de extender o modificar en el futuro, ya que la base de datos puede cambiar sin afectar la lógica del negocio ni la API.
