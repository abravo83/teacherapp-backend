# Documentación - Profesores

## Endpoints

### Obtener un Profesor por ID

- URL: `GET /api/profesores/:id`
- Middleware: `checkRolProfesor`
- Descripción: Devuelve la información completa de un profesor, incluyendo sus datos de usuario y las materias asignadas.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del profesor.

### Registrar un Nuevo Profesor

- URL: `POST /api/profesores/registro`
- Descripción: Registra un nuevo profesor con sus datos de usuario, detalles específicos de profesor y materias asignadas.
- Body: Debe enviarse en formato `multipart/form-data` para incluir posibles archivos (como foto de perfil). Campos:
  - `usuario`: Información del usuario (nombre, email, etc.).
  - `profesor`: Detalles específicos del profesor (como título, especialización).
  - `materias`: Lista de materias asignadas.
  - `foto`: Archivo de imagen para la foto del profesor (opcional).
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del profesor recién creado.

### Actualizar un Profesor Existente

- URL: `PUT /api/profesores/:id`
- Middleware: `checkRolProfesor`
- Descripción: Actualiza los datos de un profesor existente, incluyendo la actualización de materias asignadas.
- Body: Debe enviarse en formato `multipart/form-data` para permitir la actualización de archivos. Incluye los campos:
  - `usuario`: Información del usuario actualizada.
  - `profesor`: Detalles específicos del profesor.
  - `materias`: Lista actualizada de materias asignadas.
  - `foto`: Archivo de imagen para la foto del profesor (opcional).
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con los datos actualizados del profesor.

## Middleware `checkRolProfesor`

Este middleware verifica si el usuario con el `ID` especificado tiene el rol de `profesor` antes de permitir el acceso a ciertas rutas. Si el usuario no tiene el rol adecuado, se devuelve un error 403. El middleware se encuentra en `utils/middlewares.js`.

