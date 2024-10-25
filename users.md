## GET ALL USERS (By Role)
Este endpoint permite obtener un listado de todos los usuarios registrados en la plataforma, filtrando por su rol (profesor o alumno).

URL: /api/users?rol=ROL (filtro por profesor o alumno)
MÉTODO: GET
HEADERS: X
BODY: X

Restricciones:

- 

Respuesta:

- Se responde con el listado de usuarios que tienen el rol especificado (profesor o alumno).

## GET USER BY ID
Este endpoint permite obtener la información detallada de un usuario específico, que puede ser profesor o alumno, basado en su ID.

URL: /api/users/:IDUser
MÉTODO: GET
HEADERS: X
BODY: X

Restricciones:

- 

Respuesta:

- Se responde con los datos del usuario correspondiente al ID proporcionado.


## CREATE NEW USER (REGISTRO)
Este endpoint permite registrar un nuevo usuario (profesor o alumno) en la plataforma. Al recibir los datos proporcionados, se encripta la contraseña antes de almacenarla en la base de datos para garantizar la seguridad.

URL: /api/users/register
MÉTODO: POST
HEADERS: X
BODY: username, email, password, rol. CAMPOS BÁSICOS Y LUEGO COMPLETAMOS CON UPDATE?

Restricciones:

- Accesible para cualquier usuario que quiera registrarse.

Respuesta:
- Respondemos con el nuevo registro creado

## LOGIN
Este endpoint permite a los usuarios registrados (administradores, profesores o alumnos) iniciar sesión en la plataforma. Al recibir las credenciales, se verifica la autenticidad y, si son correctas, se genera un token de autenticación que permite acceder a las funcionalidades protegidas de la plataforma.

URL: /api/users/login
MÉTODO: POST
HEADERS: X
BODY: email, password

Restricciones:

- Accesible para cualquier usuario.

Respuesta:
- Si las credenciales son válidas, se devuelve un token JWT (JSON Web Token) para autenticación y el perfil básico del usuario (por ejemplo, id, rol, nombre).
- Si las credenciales no son válidas, se devuelve un mensaje de error indicando que el email o la contraseña son incorrectos.


## UPDATE USER
Este endpoint permite actualizar la información de un usuario existente. Si el usuario es un profesor, se pueden actualizar los campos adicionales específicos de los profesores.

URL: /api/users/:IDUser
MÉTODO: PUT
HEADERS: X
BODY: user, name, surname, email, password, rol, foto. Si el rol es profesor, también incluir: teléfono, precio_hora, ubicación y meses_experiencia. + MATERIAS

Restricciones:

- Solo accesible para el propio usuario registrado y logeado que está actualizando su propia información o para usuarios con el rol administrador.

Respuesta:

- Se responde con la confirmación de la actualización de los datos del profesor. 


## DELETE USER
Este endpoint permite eliminar (o dar de baja) a un profesor o alumno específico.

URL: /api/users/:IDUser
MÉTODO: DELETE
HEADERS: X
BODY: X

Restricciones:

- Solo accesible para usuarios con el rol de administrador, o para los usuarios registrados y logeados que quieran borrar su cuenta.

Respuesta:

Se responde con la confirmación de que el usuario ha sido eliminado (o dado de baja).


## VALIDATE USER

Este endpoint permite que los administradores validen a los usuarios registrados (generalmente profesores), habilitándolos para aparecer en el directorio o tener acceso a funcionalidades específicas de la plataforma.

URL: /api/users/validate/:IDUser
MÉTODO: PUT
HEADERS: Debe incluir un token de autenticación que verifique que el usuario es administrador.
BODY: X

Restricciones: Solo los usuarios con el rol de administrador pueden acceder a este endpoint

Respuesta:

Se responde con la confirmación de que el usuario ha sido validado.