const {
  selectAllMensajes,
  sendMensaje,
  selectMsjById,
  selectMsjEmitUser,
  Readmsj,
  selectMensajesEntreUsuarios,
  selectmischat,
} = require("../models/mensajesModel");

//llama a todos los msj
const obtenerMensajes = async (req, res, next) => {
  try {
    const [mensajes] = await selectAllMensajes();
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

//llama a //enviar msj y devulve el mensaje enviado id
const enviarmensaje = async (req, res, next) => {
  try {
    const [result] = await sendMensaje(req.body);
    const msj = await selectMsjById(result.insertId);
    res.json(msj);
  } catch (error) {
    next(error);
  }
};

//llama a // mensajes sin leer de un usuario
const mensajesNoLeidos = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const mensajes = await selectMsjEmitUser(userid);
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

//llama a //marca como leido un mensaje
const marcarLeido = async (req, res, next) => {
  try {
    const { msjid } = req.params;
    const result = await Readmsj(msjid);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const obtenerMensajesEntreUsuarios = async (req, res, next) => {
  const { emisor_id, destinatario_id } = req.params;

  try {
    const mensajes = await selectMensajesEntreUsuarios(
      emisor_id,
      destinatario_id
    );
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

//mis recibidos
const chatusers = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const mensajes = await selectmischat(userid);
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerMensajes,
  enviarmensaje,
  mensajesNoLeidos,
  marcarLeido,
  obtenerMensajesEntreUsuarios,
  chatusers,
};
