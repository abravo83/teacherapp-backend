const pool = require("../config/db");

function selectAllOpiniones() {
  return pool.query("select * from opiniones");
}

async function selectOpinonesById(id) {
  const [result] = await pool.query("select * from opiniones where id = ?", [
    id,
  ]);

  if (result.length === 0) return null;

  return result;
}

async function selectOpinionesByProfesorId(profesorId) {
  const [result] = await pool.query(
    "select * from opiniones where profesor_id = ?",
    [profesorId]
  );

  if (result.length === 0) return null;

  return result;
}

async function selectOpinionesByAlumnoId(alumnoId) {
  const [result] = await pool.query(
    "select * from opiniones where alumno_id = ?",
    [alumnoId]
  );

  if (result.length === 0) return null;

  return result;
}

function insertOpinion({ estudiante_id, profesor_id, puntuacion, comentario }) {
  return pool.query(
    "insert into opiniones (estudiante_id, profesor_id, puntuacion, comentario, fecha) values (?, ?, ?, ?, DATE(NOW()))",
    [estudiante_id, profesor_id, puntuacion, comentario]
  );
}

function updateOpinionById(
  idOpinion,
  { estudiante_id, profesor_id, puntuacion, comentario }
) {
  return pool.query(
    "update opiniones set estudiante_id = ?, profesor_id = ?, puntuacion = ?, comentario = ? where id = ?",
    [estudiante_id, profesor_id, puntuacion, comentario, idOpinion]
  );
}

function deleteOpinionById(id) {
  return pool.query("delete from opiniones where id = ?", [id]);
}

module.exports = {
  selectAllOpiniones,
  selectOpinonesById,
  selectOpinionesByProfesorId,
  selectOpinionesByAlumnoId,
  insertOpinion,
  updateOpinionById,
  deleteOpinionById,
};
