# TeacherApp Backend

**TeacherApp Backend** es la API del proyecto final elaborado por el Grupo 1 del Máster FullStack Developer de la Universidad Internacional de la Rioja (UNIR). Es responsable de gestionar la lógica y los datos de la aplicación, ofreciendo funcionalidades como el registro y autenticación de usuarios, validación de profesores, interacción entre alumnos y profesores, y gestión de accesos según los roles de administrador, profesor y alumno.

A continuación, se presenta la guía de instalación, configuración y uso.


## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
  - [1. Clonar el repositorio](#1-clonar-el-repositorio)
  - [2. Instalar dependencias](#2-instalar-dependencias)
  - [3. Configurar las variables de entorno](#3-configurar-las-variables-de-entorno)
  - [4. Configurar la base de datos](#4-configurar-la-base-de-datos)
  - [5. Ejecutar el servidor](#5-ejecutar-el-servidor)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---


## Requisitos Previos

Antes de instalar y ejecutar este proyecto, asegúrate de tener:

- [Node.js](https://nodejs.org/) (v16 o superior recomendado).
- [MySQL](https://www.mysql.com/) instalado y en ejecución.
- [Git](https://git-scm.com/) para clonar el repositorio.

---

## Instalación y Configuración

Sigue los pasos a continuación para configurar el proyecto correctamente:

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/abravo83/teacherapp-backend.git
cd teacherapp-backend
```

### 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```
npm install
```

### 3. Configurar las variables de entorno

##### Configuración de la base de datos
 ```plaintext
DB_HOST_ADDRESS=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_PORT=3306
DB_NAME=teacherapp
 ```

##### Configuración del servidor
 ```plaintext
PORT=3000
CLAVE=tu_clave_secreta_para_tokens
 ```

#### Configuración del correo (OAuth2)
 ```plaintext
EMAIL_USER=tu_correo@gmail.com
EMAIL_SERVICE=gmail
CLIENT_ID=tu_client_id
CLIENT_SECRET=tu_client_secret
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=tu_refresh_token
 ```

Nota: Se incluye un archivo example.env en el repositorio con la estructura básica de las variables de entorno.

### 4. Configurar la base de datos

1. **Importar la base de datos**  
   En el repositorio se incluye un archivo `teacherapp.sql` que contiene la estructura básica de la base de datos y datos iniciales para pruebas. Para importarlo, sigue estos pasos:

   - Abre una terminal y ejecuta el siguiente comando:
     ```bash
     mysql -u [usuario] -p teacherapp < teacherapp.sql
     ```
     Reemplaza `[usuario]` por tu usuario de MySQL. Si utilizas un puerto diferente al predeterminado (3306), añade `--port=[puerto]` al comando.

2. **Configurar las credenciales**  
   Asegúrate de que el archivo `.env` en el proyecto tenga configuradas las credenciales correctas para tu servidor MySQL. Un ejemplo básico sería:

   ```plaintext
   DB_HOST_ADDRESS=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_PORT=3306
   DB_NAME=teacherapp

3. **Confirmar la importación**  
   Abre tu cliente MySQL y ejecuta el siguiente comando para verificar que las tablas y los datos iniciales se hayan importado correctamente:

   ```sql
   SHOW TABLES;

Esto mostrará las tablas creadas en la base de datos teacherapp.


## 5. Ejecutar el servidor

Para iniciar el servidor en modo desarrollo:

```
npm run dev
npm start
```

El servidor estará disponible en http://localhost:3000 (o en el puerto configurado en el archivo .env).


## Estructura del proyecto:

   ```plaintext
.
├── index.js               # Archivo principal de inicio
├── .env                   # Configuración de variables de entorno
├── package.json           # Configuración del proyecto y dependencias
├── /routes                # Definición de las rutas
├── /controllers           # Lógica de los controladores
├── /models                # Definición de modelos y consultas a la base de datos
├── /utils                 # Utilidades y funciones auxiliares personalizadas
├── /config                # Configuración de la base de datos y otros servicios
└── teacherapp.sql         # Archivo con la estructura y datos iniciales de la base de datos

   ```

## Tecnologías Utilizadas

##### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

##### Email y Autenticación OAuth2
- [Nodemailer](https://nodemailer.com/)
- [Google APIs](https://developers.google.com/identity/protocols/oauth2)

##### Otras Herramientas
- [dotenv](https://www.npmjs.com/package/dotenv) (gestión de variables de entorno)
- [Multer](https://www.npmjs.com/package/multer) (manejo de archivos)
- [Nodemon](https://www.npmjs.com/package/nodemon) (desarrollo en tiempo real)
