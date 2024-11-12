const express = require("express");
const router = express.Router();
const {
  obtenerAlumno,
  registroAlumno,
  actualizarAlumno,
  activarDesactivar
} = require("../../controllers/alumnosController");

const { checkRolAdministrador } = require("../../utils/middlewares");
const { uploadToImgProfile } = require("../../utils/middlewares");

router.get("/:id", obtenerAlumno);
router.post("/registro", uploadToImgProfile.single("imagen"), registroAlumno);
router.put("/:id", uploadToImgProfile.single("imagen"), actualizarAlumno);

router.put("/:id/activar", checkRolAdministrador, activarDesactivar);


module.exports = router;
