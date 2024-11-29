const pool = require("../config/db");

const selectAllInscripciones = () => {
  return pool.query("select * from inscripciones_clase");
};

const selectAllInscripcionesByEstudianteId = (estudianteId) => {
  return pool.query(
    "select alumno_id, profesor_id, nombre as nombre_profesor , apellidos as apellidos_profesor, foto as foto_profesor, email as email_profesor, fecha_registro, fecha_fin from inscripciones_clase inner join usuarios on inscripciones_clase.profesor_id = usuarios.id where inscripciones_clase.alumno_id = ? ",
    [estudianteId]
  );
};

const selectAllInscripcionesByProfesorId = (profesorId) => {
  return pool.query(
    "select profesor_id, alumno_id, nombre as nombre_alumno, apellidos as apellidos_alumno, foto as foto_alumno, email as email_alumno, fecha_registro, fecha_fin from inscripciones_clase INNER JOIN usuarios on inscripciones_clase.alumno_id = usuarios.id where profesor_id = ?",
    [profesorId]
  );
};

const selectInscripcion = (id) => {
  return pool.query("select * from inscripciones_clase where id = ?", [id]);
};

const insertInscripcion = ({ alumno_id, profesor_id }) => {
  return pool.query(
    "insert into inscripciones_clase (alumno_id, profesor_id, fecha_registro) values (?, ?, NOW()); ",
    [alumno_id, profesor_id]
  );
};

const closeInscripcion = (id) => {
  return pool.query(
    "update inscripciones_clase set fecha_fin = NOW() where id = ?",
    [id]
  );
};

module.exports = {
  selectAllInscripcionesByEstudianteId,
  selectAllInscripcionesByProfesorId,
  selectAllInscripciones,
  selectInscripcion,
  insertInscripcion,
  closeInscripcion,
};
