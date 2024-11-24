const pool = require("../config/db");

const selectAllRegistrosByEstudianteId = (estudianteId) => {
  return pool.query("select * from inscripciones_clase where alumno_id = ?", [
    estudianteId,
  ]);
};

module.exports = {
  selectAllRegistrosByEstudianteId,
};
