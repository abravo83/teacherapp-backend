# Documentación - Administración de Alumnos y Profesores

## Endpoints

### Activar o Desactivar un Usuario

- URL: `PUT /api/usuarios/activar/:id`
- Descripción: Activa o desactiva un usuario (baja lógica) basado en el valor booleano de `activo`.
- Parámetros:
  - `id`: ID del usuario a activar o desactivar, ubicado al final de la ruta.
- Body:
  - `activo`: Booleano; `true` para activar y `false` para desactivar.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con el estado actualizado del usuario.


### Validar o Desvalidar un Profesor

- URL: `PUT /api/profesores/validar/:id`
- Descripción: Valida o desvalida un profesor, basado en el valor booleano de `validado`.
- Parámetros:
  - `id`: ID del profesor a validar o desvalidar, ubicado al final de la ruta.
- Body:
  - `validado`: Booleano; `true` para validar y `false` para desvalidar.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con el estado de validación actualizado del profesor.
