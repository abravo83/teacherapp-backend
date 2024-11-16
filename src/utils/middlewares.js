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

const checkRolAdministrador = async (req, res, next) => {
  try {    
    if (req.user.rol !== "administrador") {
      return res.status(403).json({ message: "Acceso denegado: no tienes permisos de administrador" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al verificar el rol de administrador", error });
  }
};




module.exports = {
  checkToken,  
  uploadToImgProfile,
  checkRolAdministrador,
};
