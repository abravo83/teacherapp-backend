const {
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  validarDesvalidarProfesor
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

async function validarDesvalidar(req, res) {
  const { id } = req.params;
  const { validado } = req.body;

  try {
    const actualizado = await validarDesvalidarProfesor(id, validado);
    if (!actualizado) {
      return res.status(404).json({ message: 'Profesor no encontrado o rol incorrecto' });
    }

    const mensajeValidacion = validado ? 'Profesor validado correctamente' : 'Profesor desvalidado correctamente';
    res.status(200).json({ message: mensajeValidacion });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la validación del profesor', error });
  }
}

module.exports = {
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar,
};
