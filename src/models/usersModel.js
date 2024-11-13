const pool = require("../config/db");

function selectAllUsers() {
  return pool.query("select * from usuarios");
}

async function selectByEmail(email) {
  const [result] = await pool.query('select * from usuarios where email = ?', [email]);
    if (result.length === 0) return null;
    return result[0];
}

async function activarDesactivarUsuario(id, activo) {
  const [result] = await pool.query("UPDATE usuarios SET activo = ? WHERE id = ?", [activo, id]);
  return result;
}

module.exports = { selectAllUsers, selectByEmail, activarDesactivarUsuario};
