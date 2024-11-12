# Documentación - Administración de Alumnos y Profesores

## Endpoints

### Activar o Desactivar un Alumno

- URL: `PUT /api/alumnos/:id/activar`
- Descripción: Activa o desactiva un alumno (baja lógica) basado en el valor booleano de `activo`.
- Parámetros:
  - `id`: ID del alumno a activar o desactivar.
- Body:
  - `activo`: Booleano; `true` para activar y `false` para desactivar.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con el estado actualizado del alumno.

---

### Validar o Desvalidar un Profesor

- URL: `PUT /api/profesores/:id/validar`
- Descripción: Valida o desvalida un profesor para que aparezca o no en el directorio, basado en el valor booleano de `validado`.
- Parámetros:
  - `id`: ID del profesor a validar o desvalidar.
- Body:
  - `validado`: Booleano; `true` para validar y `false` para desvalidar.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con el estado de validación actualizado del profesor.
