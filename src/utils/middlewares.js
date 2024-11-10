const pool = require("../config/db");

const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Middleware the multer
const uploadToImgProfile = multer({
  dest: path.join(__dirname, "../Public/img/profiles/"),
});

const checkToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(403)
      .json({ message: "Debes incluir la cabecera de Authorization" });
  }

  const token = req.headers["authorization"];

  let data;
  try {
    data = jwt.verify(token, process.env.CLAVE);
  } catch (error) {
    return res.status(403).json({ message: "El token es incorrecto" });
  }

  const usuario = await selectStaffById(data.usuario_id);
  if (!usuario) {
    return res.status(403).json({ message: "El usuario no existe" });
  }

  req.user = usuario;

  next();
};

const checkAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Debes ser administrador" });
  }
  next();
};

async function checkRolProfesor(req, res, next) {
  const profesorId = req.params.id || req.body.usuario?.id;

  if (!profesorId) {
    return res.status(400).json({ message: "ID de profesor no proporcionado" });
  }

  try {
    const [usuario] = await pool.query(
      "SELECT rol FROM usuarios WHERE id = ?",
      [profesorId]
    );

    if (usuario.length === 0 || usuario[0].rol !== "profesor") {
      return res.status(403).json({
        message: "Acceso denegado: el usuario no es un profesor",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error al verificar el rol de profesor",
    });
  }
}

async function checkRolAlumno(req, res, next) {
  const alumnoId = req.params.id || req.body.id;

  if (!alumnoId) {
    return res.status(400).json({ message: "ID de alumno no proporcionado" });
  }

  try {
    const [usuario] = await pool.query(
      "SELECT rol FROM usuarios WHERE id = ?",
      [alumnoId]
    );

    if (usuario.length === 0 || usuario[0].rol !== "alumno") {
      return res.status(403).json({
        message: "Acceso denegado: el usuario no es un alumno",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error al verificar el rol de alumno",
    });
  }
}

module.exports = {
  checkToken,
  checkRolProfesor,
  checkRolAlumno,
  uploadToImgProfile,
};
