const pool = require("../config/db");

async function insertProfesor({ usuario, profesor, materias }) {
  const [usuarioResult] = await pool.query(
    "INSERT INTO usuarios (nombre, apellidos, email, password, rol, foto, activo) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      usuario.nombre,
      usuario.apellidos,
      usuario.email,
      usuario.password,
      "profesor",
      usuario.foto,
      1,
    ]
  );
  const usuarioId = usuarioResult.insertId;

  await pool.query(
    "INSERT INTO profesores (usuarios_id, precio_hora, localizacion, telefono, meses_experiencia, validado) VALUES (?, ?, ?, ?, ?, ?)",
    [
      usuarioId,
      profesor.precio_hora,
      profesor.localizacion,
      profesor.telefono,
      profesor.meses_experiencia,
      0,
    ]
  );

  if (materias && materias.length) {
    const values = materias.map((materiaId) => [usuarioId, materiaId]);
    await pool.query(
      "INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?",
      [values]
    );
  }

  return usuarioId;
}

async function updateProfesor(profesorId, { usuario, profesor, materias }) {
  await pool.query(
    "UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, password = COALESCE(?, password), foto = ?, activo = ? WHERE id = ?",
    [
      usuario.nombre,
      usuario.apellidos,
      usuario.email,
      usuario.password,
      usuario.foto,
      usuario.activo,
      profesorId,
    ]
  );

  await pool.query(
    "UPDATE profesores SET telefono = ?, precio_hora = ?, localizacion = ?, meses_experiencia = ?, validado = ? WHERE usuarios_id = ?",
    [
      profesor.telefono,
      profesor.precio_hora,
      profesor.localizacion,
      profesor.meses_experiencia,
      profesor.validado,
      profesorId,
    ]
  );

  await pool.query("DELETE FROM materias_profesores WHERE usuarios_id = ?", [
    profesorId,
  ]);
  if (materias && materias.length) {
    const values = materias.map((materiaId) => [profesorId, materiaId]);
    await pool.query(
      "INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?",
      [values]
    );
  }

  return profesorId;
}

async function selectProfesorById(profesorId) {
  const [usuario] = await pool.query(
    'SELECT * FROM usuarios WHERE id = ? AND rol = "profesor"',
    [profesorId]
  );
  if (usuario.length === 0) return null;

  const [profesor] = await pool.query(
    "SELECT * FROM profesores WHERE usuarios_id = ?",
    [profesorId]
  );
  const [materias] = await pool.query(
    "SELECT Materias_id FROM materias_profesores WHERE usuarios_id = ?",
    [profesorId]
  );

  return {
    usuario: usuario[0],
    profesor: profesor[0],
    materias: materias.map((m) => m.Materias_id),
  };
}

async function validarDesvalidarProfesor(id, validado) {
  const [usuario] = await pool.query(
    `SELECT * FROM usuarios WHERE id = ? AND rol = 'profesor'`,
    [id]
  );

  if (usuario.length === 0) return false;

  const [result] = await pool.query(
    "UPDATE profesores SET validado = ? WHERE usuarios_id = ?",
    [validado ? 1 : 0, id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  validarDesvalidarProfesor,
};
