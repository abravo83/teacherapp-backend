# Documentación - Profesores

## Endpoints

### Obtener un Profesor por ID

URL: `GET /api/profesores/:id`
- Middleware: `checkRolProfesor`
- Descripción: Devuelve la información completa de un profesor, incluyendo sus datos de usuario y las materias asignadas.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la información del profesor.

### Registrar un Nuevo Profesor

- URL: `POST /api/profesores/registro`
- Descripción: Registra un nuevo profesor con sus datos de usuario, detalles específicos de profesor y materias asignadas.
- Body: JSON con los campos `usuario`, `profesor`, y `materias`.
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del profesor recién creado.

### Actualizar un Profesor Existente

- URL: `PUT /api/profesores/:id`
- Middleware: `checkRolProfesor`
- Descripción: Actualiza los datos de un profesor existente, incluyendo la actualización de materias asignadas.
- Body: JSON con los campos `usuario`, `profesor`, y `materias`.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con los datos actualizados del profesor.

## Middleware `checkRolProfesor`

Este middleware verifica si el usuario con el `ID` especificado tiene el rol de `profesor` antes de permitir el acceso a ciertas rutas. Si el usuario no tiene el rol adecuado, se devuelve un error 403. El middleware se encuentra en `utils/middlewares.js`.

