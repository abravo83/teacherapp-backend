const pool = require('../config/db');

async function selectAlumnoById(alumnoId) {
    const [result] = await pool.query(
        `SELECT id, nombre, apellidos, email, foto, activo 
         FROM usuarios 
         WHERE id = ? AND rol = 'alumno'`,
        [alumnoId]
    );
    return result[0] || null;
}

async function insertAlumno({ nombre, apellidos, email, password, foto }) {
    const [result] = await pool.query(
        `INSERT INTO usuarios (nombre, apellidos, email, password, rol, foto, activo) 
         VALUES (?, ?, ?, ?, 'alumno', ?, 1)`,
        [nombre, apellidos, email, password, foto]
    );
    return result.insertId;
}

async function updateAlumno(alumnoId, { nombre, apellidos, email, password, foto, activo }) {
    await pool.query(
        `UPDATE usuarios 
         SET nombre = ?, apellidos = ?, email = ?, password = COALESCE(?, password), foto = ?, activo = ? 
         WHERE id = ? AND rol = 'alumno'`,
        [nombre, apellidos, email, password, foto, activo, alumnoId]
    );
    return alumnoId;
}

module.exports = {
    selectAlumnoById,
    insertAlumno,
    updateAlumno,
};