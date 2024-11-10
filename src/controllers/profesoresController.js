const {
  insertProfesor,
  updateProfesor,
  selectProfesorById,
} = require("../models/profesorModel");
const bcrypt = require("bcryptjs");

const { saveProfileImage } = require("../utils/helpers");

const obtenerProfesor = async (req, res, next) => {
  try {
    const profesor = await selectProfesorById(req.params.id);
    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(profesor);
  } catch (error) {
    next(error);
  }
};

const registroProfesor = async (req, res, next) => {
  try {
    let datos = JSON.parse(req.body.datos);

    // Comprobamos si en el FormData viene foto que haya tratado multer
    if (req.file) {
      datos.usuario.foto = saveProfileImage(req.file);
    }

    datos.usuario.password = await bcrypt.hash(datos.usuario.password, 8);
    const profesorId = await insertProfesor(datos);
    const profesor = await selectProfesorById(profesorId);
    res.json(profesor);
  } catch (error) {
    next(error);
  }
};

const actualizarProfesor = async (req, res, next) => {
  try {
    let datos = JSON.parse(req.body.datos);
    if (req.file) {
      datos.usuario.foto = saveProfileImage(req.file);
    }

    if (datos.usuario.password) {
      datos.usuario.password = await bcrypt.hash(datos.usuario.password, 8);
    }
    const profesorActualizado = await updateProfesor(req.params.id, datos);
    if (!profesorActualizado) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.json(await selectProfesorById(profesorActualizado));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
};
