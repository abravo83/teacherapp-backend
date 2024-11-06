const { selectAlumnoById, insertAlumno, updateAlumno } = require('../models/alumnoModel');
const bcrypt = require('bcryptjs');

const obtenerAlumno = async (req, res, next) => {
    try {
        const alumno = await selectAlumnoById(req.params.id);
        if (!alumno) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }
        res.json(alumno);
    } catch (error) {
        next(error);
    }
};

const registroAlumno = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        const alumnoId = await insertAlumno(req.body);
        const nuevoAlumno = await selectAlumnoById(alumnoId);
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        next(error);
    }
};

const actualizarAlumno = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
        const alumnoActualizadoId = await updateAlumno(req.params.id, req.body);
        const alumnoActualizado = await selectAlumnoById(alumnoActualizadoId);
        if (!alumnoActualizado) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }
        res.json(alumnoActualizado);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerAlumno,
    registroAlumno,
    actualizarAlumno,
};



// //FRONTEND
// getAlumnoById(id: number): Observable<Iusuario> {
//     return this.http.get<Iusuario>(`${this.baseURL}/api/alumnos/${id}`);
//   }

//   registroAlumno(alumno: Iusuario): Observable<Iusuario> {
//     return this.http.post<Iusuario>(`${this.baseURL}/api/alumnos/registro`, alumno);
//   }

//   actualizarAlumno(alumno: Iusuario): Observable<Iusuario> {
//     return this.http.put<Iusuario>(`${this.baseURL}/api/alumnos/${alumno.id}`, alumno);
//   }