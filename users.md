## GET ALL USERS (By Role)
Este endpoint permite obtener un listado de todos los usuarios registrados en la plataforma, filtrando por su rol (profesor o alumno).

URL: /api/users?rol=ROL (filtro por profesor o alumno)
MÉTODO: GET
HEADERS: X
BODY: X

Respuesta:

- Se responde con el listado de usuarios que tienen el rol especificado (profesor o alumno).

## GET USER BY ID
Este endpoint permite obtener la información detallada de un usuario específico, que puede ser profesor o alumno, basado en su ID.

URL: /api/users/:IDUser
MÉTODO: GET
HEADERS: X
BODY: X

Respuesta:

- Se responde con los datos del usuario correspondiente al ID proporcionado.


## CREATE NEW USER (REGISTRO)
Este endpoint permite registrar un nuevo usuario (profesor o alumno) en la plataforma. Al recibir los datos proporcionados, se encripta la contraseña antes de almacenarla en la base de datos para garantizar la seguridad.

URL: /api/users/register
MÉTODO: POST
HEADERS: X
BODY: user, email, password, rol, foto. Si el rol es profesor, también incluir: teléfono, precio_hora, ubicación y meses_experiencia. + MATERIAS

Respuesta:
- Respondemos con el nuevo registro creado


## UPDATE USER
Este endpoint permite actualizar la información de un usuario existente. Si el usuario es un profesor, se pueden actualizar los campos adicionales específicos de los profesores.

URL: /api/users/:IDUser
MÉTODO: PUT
HEADERS: X
BODY: user, email, password, rol, foto. Si el rol es profesor, también incluir: teléfono, precio_hora, ubicación y meses_experiencia. + MATERIAS

Respuesta:

Se responde con la confirmación de la actualización de los datos del profesor. 


## DELETE TEACHER
Este endpoint permite eliminar (o dar de baja) a un profesor específico.

URL: /api/users/:IDUser
MÉTODO: DELETE
HEADERS: X
BODY: X

Respuesta:

Se responde con la confirmación de que el usuario ha sido eliminado (o dado de baja).


