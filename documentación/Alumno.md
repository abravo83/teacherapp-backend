# Documentación - Alumnos

## Endpoints

### Listar Alumnos

- URL: `GET /api/alumnos`
- Descripción: Devuelve un listado de todos los alumnos registrados en el sistema.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de alumnos.

---

### Obtener un Alumno por ID

- URL: `GET /api/alumnos/:id`
- Descripción: Devuelve la información completa de un alumno, incluyendo sus datos de usuario.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del alumno.

---

### Registrar un Nuevo Alumno

- URL: `POST /api/alumnos/registro`
- Descripción: Registra un nuevo alumno con sus datos de usuario.
- Body: Debe enviarse en formato `multipart/form-data` para permitir el envío de archivos. Incluye los campos:
  - `nombre`: Nombre del alumno.
  - `apellidos`: Apellidos del alumno.
  - `email`: Correo electrónico del alumno.
  - `password`: Contraseña del alumno.
  - `foto`: Archivo de imagen para la foto del alumno.
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del alumno recién creado.

---

### Actualizar un Alumno Existente

- URL: `PUT /api/alumnos/:id`
- Descripción: Actualiza los datos de un alumno existente.
- Body: Debe enviarse en formato `multipart/form-data` para permitir la actualización de la foto del alumno. Incluye los campos:
  - `nombre`: Nombre del alumno.
  - `apellidos`: Apellidos del alumno.
  - `email`: Correo electrónico del alumno.
  - `password`: Contraseña del alumno (opcional).
  - `foto`: Archivo de imagen para la foto del alumno.
  - `activo`: Estado del alumno (activo/inactivo).
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con los datos actualizados del alumno.

