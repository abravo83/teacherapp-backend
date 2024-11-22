const pool = require("../config/db");

function selectAllMensajes() {
  return pool.query("SELECT * FROM mensajes;");
}

//enviar mensaje: emisor-destino
function sendMensaje({ emisor_id, destinatario_id, asunto, contenido }) {
  return pool.query(
    "insert into mensajes (emisor_id,destinatario_id,asunto,contenido,leido) values (?,?,?,?,false);",
    [emisor_id, destinatario_id, asunto, contenido]
  );
}

//devuelve mensaje por id
async function selectMsjById(msjid) {
  const [result] = await pool.query("select * from mensajes where id = ?", [
    msjid,
  ]);
  if (result.length === 0) return null;
  return result[0];
}

//retorna mensajes sin leer de un usuario
async function selectMsjEmitUser(userid) {
  const [result] = await pool.query(
    "SELECT m.*, u.nombre AS nombre_emisor, u.apellidos AS apellidos_emisor FROM mensajes m JOIN usuarios u ON m.emisor_id = u.id WHERE m.destinatario_id = ? AND m.leido = false;",
    [userid]
  );
  if (result.length === 0) return null;
  return result;
}
//marca como leido un mensaje
async function Readmsj(msjid) {
  const [result] = await pool.query(
    "UPDATE mensajes SET leido = true WHERE id = ?",
    [msjid]
  );
  if (result.length === 0) return null;
  return result;
}

async function selectMensajesEntreUsuarios(emisor_id, destinatario_id) {
  // Consulta para obtener todos los mensajes entre el emisor y destinatario
  const [result] = await pool.query(
    `SELECT * FROM mensajes
WHERE (emisor_id = ? AND destinatario_id = ?)
   OR (emisor_id = ? AND destinatario_id = ?)
ORDER BY id ASC;`,
    [emisor_id, destinatario_id, destinatario_id, emisor_id]
  );
  if (result.length === 0) {
    console.log("No se encontraron mensajes entre los usuarios.");
    return []; // Puedes devolver un array vacío si no se encuentran mensajes
  }
  return result; // Devuelve los mensajes
}

async function selectmischat(userid) {
  const [result] = await pool.query(
    "SELECT m.*, u.nombre AS nombre_emisor, u.apellidos AS apellidos_emisor FROM mensajes m JOIN usuarios u ON m.emisor_id = u.id WHERE m.destinatario_id=?;",
    [userid]
  );
  console.log(result);
  if (result.length === 0) return null;
  return result;
}
/* async function nameuserId(userid) {
  const result = await pool.query(
    "select nombre,apellidos from usuarios where id=?;",
    [userid]
  );
  if (result.length === 0) {
    return null;
  }
  return result[0];
} */

module.exports = {
  selectAllMensajes,
  sendMensaje,
  selectMsjById,
  selectMsjEmitUser,
  Readmsj,
  selectmischat,
  selectMensajesEntreUsuarios,
};
