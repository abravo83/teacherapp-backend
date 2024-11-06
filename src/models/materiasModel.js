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

module.exports = {
    selectAllMaterias,
    selectMateriasByProfesorId,
};



// //Servicio frontend:
// getMaterias(): Observable<Imateria[]> {
//     return this.http.get<Imateria[]>(`${this.baseURL}/api/materias`);
//   }

//   getMateriasProfesor(profesorId: number): Observable<IMateriaProfesor[]> {
//     return this.http.get<IMateriaProfesor[]>(`${this.baseURL}/api/materias/profesor-materias/${profesorId}`);
//   }