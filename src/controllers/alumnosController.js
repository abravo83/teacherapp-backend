const {
  selectAlumnoById,
  insertAlumno,
  updateAlumno,
  listarAlumnos
} = require("../models/alumnoModel");


const bcrypt = require("bcryptjs");

const { saveProfileImage } = require("../utils/helpers");

const obtenerAlumnos = async (req, res, next) => {
  try {
    const alumnos = await listarAlumnos();
    res.status(200).json(alumnos);
  } catch (error) {
    next(error);
  }
};

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
    let datos = JSON.parse(req.body.datos);

    // Comprobamos si en el FormData viene foto que haya tratado multer
    if (req.file) {
      datos.foto = saveProfileImage(req.file);
    }

    datos.password = await bcrypt.hash(datos.password, 8);
    const alumnoId = await insertAlumno(datos);
    const nuevoAlumno = await selectAlumnoById(alumnoId);
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    next(error);
  }
};

const actualizarAlumno = async (req, res, next) => {
  try {
    let datos = JSON.parse(req.body.datos);
    if (req.file) {
      datos.foto = saveProfileImage(req.file);
    }

    if (datos.password) {
      datos.password = await bcrypt.hash(datos.password, 8);
    }
    const alumnoActualizadoId = await updateAlumno(req.params.id, datos);
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
  obtenerAlumnos,
  obtenerAlumno,
  registroAlumno,
  actualizarAlumno,
};

