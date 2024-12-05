const { selectByEmail } = require("../models/usersModel");
const pool = require("../config/db");
const crypto = require("crypto");
const {
  actualizarUsuarioConCodigo,
  actualizarpassword,
} = require("../models/recuperarClaveModel");
const { enviarCorreoRestablecimiento } = require("../utils/resetpassword");

const generarCodigo = () => {
  return crypto.randomBytes(5).toString("hex").substring(0, 10);
};

const enviarEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const usuario = await selectByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Email invalido ó incorrecto" });
    }

    const codigo = generarCodigo();
    const expiracion = new Date(Date.now());
    expiracion.setHours(expiracion.getHours() + 1);
    const asunto = "Restablecimiento de Contraseña";

    const result = await actualizarUsuarioConCodigo(codigo, expiracion, email);
    //const reseturl = `http://localhost:3000/reset-password?code=${codigo}`;

    console.log("antes de enviar al reset pass:", codigo);
    await enviarCorreoRestablecimiento(email, asunto, codigo);

    res.status(200).json({ message: "email correcto" });
  } catch (error) {
    next(error);
  }
};

const actualizarpass = async (req, res, next) => {
  const { code, newpass } = req.body;
  console.log(code, newpass, "en backend");
  try {
    const update = await actualizarpassword(code, newpass);
    console.log(update);
    res.status(200).json({ message: "contraseña actualizada" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enviarEmail,
  actualizarpass,
};
