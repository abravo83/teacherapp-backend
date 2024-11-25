const pool = require("../config/db");

const selectAllInscripciones = () => {
  return pool.query("select * from inscripciones_clase");
};

const selectAllInscripcionesByEstudianteId = (estudianteId) => {
  return pool.query("select * from inscripciones_clase where alumno_id = ?", [
    estudianteId,
  ]);
};

const selectAllInscripcionesByProfesorId = (profesorId) => {
  return pool.query("select * from inscripciones_clase where profesor_id = ?", [
    profesorId,
  ]);
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
