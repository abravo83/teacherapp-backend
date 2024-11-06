const pool = require('../config/db');

async function selectAllMaterias() {
    const [result] = await pool.query('SELECT * FROM materias');
    return result;
}

async function selectMateriasByProfesorId(profesorId) {
    const [materias] = await pool.query(
        `SELECT m.id, m.nombre 
         FROM materias AS m
         JOIN materias_profesores AS mp ON m.id = mp.Materias_id
         WHERE mp.usuarios_id = ?`,
        [profesorId]
    );
    return materias;
}

async function insertMateria(nombre) {
    const [result] = await pool.query(
        'INSERT INTO materias (nombre) VALUES (?)',
        [nombre]
    );
    return { id: result.insertId, nombre };
}

async function insertMateriasForProfesor(profesorId, materias) {
    const values = materias.map((materiaId) => [profesorId, materiaId]);
    await pool.query('INSERT INTO materias_profesores (usuarios_id, Materias_id) VALUES ?', [values]);
    return await selectMateriasByProfesorId(profesorId);
}

module.exports = {
    selectAllMaterias,
    selectMateriasByProfesorId,
    insertMateria,
    insertMateriasForProfesor,
};


// //Servicio frontend:
// getMaterias(): Observable<Imateria[]> {
//     return this.http.get<Imateria[]>(`${this.baseURL}/api/materias`);
//   }

//   getMateriasProfesor(profesorId: number): Observable<IMateriaProfesor[]> {
//     return this.http.get<IMateriaProfesor[]>(`${this.baseURL}/api/materias/profesor-materias/${profesorId}`);
//   }