const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function actualizarUsuarioConCodigo(codigo, expiracion, email) {
  const [result] = await pool.query(
    "UPDATE usuarios SET psw_reset_code = ?, psw_reset_exp_date = ? WHERE email = ?",
    [codigo, expiracion, email]
  );
  if (result.affectedRows === 0) return null;
  return result;
}

async function actualizarpassword(codigo, newpass) {
  const [res] = await pool.query(
    "SELECT email FROM usuarios WHERE psw_reset_code = ?;",
    [codigo]
  );
  if (res.length === 0) {
    return null;
  }
  // Ahora que tenemos el correo, actualizamos la contraseña
  //const hashedPassword = await bcrypt.hash(newpass, 10);

  const email = res[0].email;

  const [result] = await pool.query(
    "UPDATE usuarios SET password = ? WHERE email = ?;",
    [newpassnpm, email]
  );
  if (result.affectedRows === 0) return null;
  return result;
}

module.exports = {
  actualizarUsuarioConCodigo,
  actualizarpassword,
};
