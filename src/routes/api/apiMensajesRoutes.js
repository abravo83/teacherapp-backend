const {
  obtenerMensajes,
  enviarmensaje,
  mensajesNoLeidos,
  marcarLeido,
  chatusers,
  obtenerMensajesEntreUsuarios,
} = require("../../controllers/mensajesController");

const router = require("express").Router();

router.get("/", obtenerMensajes);
router.get("/:userid", mensajesNoLeidos);
router.get("/chat/:userid", chatusers);
//Ruta para obtener mensajes entre emisor y destinatario
router.get("/:emisor_id/:destinatario_id", obtenerMensajesEntreUsuarios);

router.post("/enviar", enviarmensaje);
router.patch("/:msjid", marcarLeido);

module.exports = router;
