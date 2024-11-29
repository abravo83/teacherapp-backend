const {
  insertProfesor,
  updateProfesor,
  selectProfesorById,
  listarProfesores,
  validarDesvalidarProfesor,
  obtenerCorreosAdministradores,
  selectAllMateriasDeProfesor,
} = require("../models/profesorModel");
const {
  enviarCorreo,
  generarMensajeRegistroProfesor,
} = require("../utils/emailService");
const bcrypt = require("bcryptjs");
const { saveProfileImage } = require("../utils/helpers");

const obtenerProfesores = async (req, res, next) => {
  try {
    const profesores = await listarProfesores();
    res.status(200).json(profesores);
  } catch (error) {
    next(error);
  }
};

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

const obtenerMateriasDeProfesor = async (req, res, next) => {
  try {
    const materias_profesores = await selectAllMateriasDeProfesor();
    res.json(materias_profesores);
  } catch (error) {
    next(error);
  }
};

const registroProfesor = async (req, res, next) => {
  try {
    let datos = JSON.parse(req.body.datos);

    if (req.file) {
      datos.usuario.foto = saveProfileImage(req.file);
    }

    datos.usuario.password = await bcrypt.hash(datos.usuario.password, 8);
    const profesorId = await insertProfesor(datos);
    const profesor = await selectProfesorById(profesorId);

    const correosAdministradores = await obtenerCorreosAdministradores();

    if (correosAdministradores.length > 0) {
      const { asunto, contenido } = generarMensajeRegistroProfesor(profesor);
      await enviarCorreo(correosAdministradores, asunto, contenido);
    }

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
    } else {
      datos.usuario.password = req.user.password;
    }

    if (!datos.usuario.foto) {
      datos.usuario.foto = req.user.foto;
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

const validarDesvalidar = async (req, res, next) => {
  const { id } = req.params;
  const { validado } = req.body;

  try {
    const actualizado = await validarDesvalidarProfesor(id, validado);
    if (!actualizado) {
      return res
        .status(404)
        .json({ message: "Profesor no encontrado o rol incorrecto" });
    }
    const mensajeValidacion = validado
      ? "Profesor validado correctamente"
      : "Profesor desvalidado correctamente";
    res.status(200).json({ message: mensajeValidacion });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la validación del profesor",
      error,
    });
  }
};

module.exports = {
  obtenerProfesores,
  obtenerProfesor,
  obtenerMateriasDeProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar,
};
