# Documentación - mensajes

## Endpoints

---

### Enviar un mensaje a otro usuario

- URL: `POST /api/mensajes/enviar`
  Descripción: Permite que un usuario envíe un mensaje a otro usuario registrado en la aplicación.

Body: Debe enviarse en formato `application/json`. Incluye los campos:

`emisor_id`: ID del usuario que envía el mensaje.
`destinatario_id`: ID del usuario que recibe el mensaje.
`asunto`: asunto.
`contenido`: Texto del mensaje.

Respuesta exitosa:

-Contenido: JSON con datos del mensaje

---

### Obtener mensajes recibidos

- URL: `GET /api/mensajes/recibidos/:receptorId`

- Descripción: Devuelve todos los mensajes recibidos por el usuario especificado por receptorId.

Parámetros de la URL:

`receptorId`: id del usuario que recibe los mensajes.

Respuesta exitosa:

- Contenido: JSON

---
