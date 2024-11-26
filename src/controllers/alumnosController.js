const {
  selectAlumnoById,
  insertAlumno,
  updateAlumno,
  listarAlumnos,
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

    datos.password = await bcrypt.hash(datos.password, 8);

    const alumnoId = await insertAlumno(datos);

    if (req.file) {
      datos.foto = saveProfileImage(req.file);
    }

    const nuevoAlumno = await selectAlumnoById(alumnoId);

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    if (req.file) {
      const fs = require("fs");
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error al eliminar la imagen temporal:", err);
      });
    }
    next(error);
  }
};


const actualizarAlumno = async (req, res, next) => {
  try {
    let datos = JSON.parse(req.body.datos);

    // Si recibimos archivo, lo guardamos en la carpeta y sustituimos el nombre.
    if (req.file) {
      datos.foto = saveProfileImage(req.file);
    }

    // Si se recibe una nueva contraseña, la encriptamos, si no recuperamos la de la BD
    if (datos.password) {
      datos.password = await bcrypt.hash(datos.password, 8);
    } else {
      datos.password = req.user.password;
    }

    // Si el campo datos.foto viene vacío entonces no hemos recibido una nueva foto y no la actualizamos
    if (!datos.foto) {
      datos.foto = req.user.foto;
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
