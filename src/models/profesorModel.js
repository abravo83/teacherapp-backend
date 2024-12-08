const pool = require("../config/db");

async function listarProfesores() {
  const [rows] = await pool.query(
    `SELECT usuarios.id, usuarios.nombre, usuarios.apellidos, usuarios.email, usuarios.rol, usuarios.foto, usuarios.activo, profesores.precio_hora, profesores.localizacion, profesores.telefono, profesores.meses_experiencia, profesores.validado FROM usuarios JOIN profesores ON usuarios.id = profesores.usuarios_id WHERE usuarios.rol = 'profesor'`
  );
  return rows;
}

async function selectAllMateriasDeProfesor() {
  const [result] = await pool.query(`SELECT 
    p.id,
    u.nombre,
    u.apellidos,
    u.email,
    u.rol,
    u.foto,
    u.activo,
    p.precio_hora,
    p.localizacion,
    p.telefono,
    p.meses_experiencia,
    p.validado,
    JSON_ARRAYAGG(m.nombre) AS materias
FROM 
    profesores p
JOIN 
    usuarios u ON p.usuarios_id = u.id
JOIN 
    materias_profesores mp ON p.usuarios_id = mp.usuarios_id
JOIN 
    materias m ON mp.Materias_id = m.id
GROUP BY 
    p.id, u.nombre, u.apellidos, u.email, u.rol, u.foto, u.activo, p.precio_hora, p.localizacion, p.telefono, p.meses_experiencia, p.validado;



`);
  return result;
}

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
    const values = materias
      .filter((materiaId) => materiaId !== null && materiaId !== undefined)
      .map((materiaId) => [profesorId, materiaId]);

    if (values.length) {
      await pool.query(
        "INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?",
        [values]
      );
    } else {
      console.log("No hay materias válidas para asociar al profesor.");
    }
  } else {
    console.log("No se enviaron materias para asociar al profesor.");
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
  const [result] = await pool.query(
    "UPDATE profesores SET validado = ? WHERE usuarios_id = ?",
    [validado, id]
  );
  return result.affectedRows > 0;
}

async function obtenerCorreosAdministradores() {
  const [rows] = await pool.query(
    'SELECT email FROM usuarios WHERE rol = "administrador" AND activo = 1'
  );
  return rows.map((row) => row.email);
}

module.exports = {
  listarProfesores,
  selectAllMateriasDeProfesor,
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  validarDesvalidarProfesor,
  obtenerCorreosAdministradores,
};
