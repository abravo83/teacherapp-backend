# Documentación - Alumnos

## Endpoints

### Obtener un Alumno por ID

- URL: `GET /api/alumnos/:id`
- Middleware: `checkRolAlumno`
- Descripción: Devuelve la información completa de un alumno, incluyendo sus datos de usuario.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del alumno.

### Registrar un Nuevo Alumno

- URL: `POST /api/alumnos/registro`
- Descripción: Registra un nuevo alumno con sus datos de usuario.
- Body: JSON con los campos `nombre`, `apellidos`, `email`, `password`, y `foto`.
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del alumno recién creado.

### Actualizar un Alumno Existente

- URL: `PUT /api/alumnos/:id`
- Middleware: `checkRolAlumno`
- Descripción: Actualiza los datos de un alumno existente.
- Body: JSON con los campos `nombre`, `apellidos`, `email`, `password` (opcional), `foto`, y `activo`.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con los datos actualizados del alumno.

## Middleware `checkRolAlumno`

Este middleware verifica si el usuario con el `ID` especificado tiene el rol de `alumno` antes de permitir el acceso a ciertas rutas. Si el usuario no tiene el rol adecuado, se devuelve un error 403. El middleware se encuentra en `utils/middlewares.js`.
