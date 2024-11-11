const express = require("express");
const router = express.Router();
const {
  obtenerAlumno,
  registroAlumno,
  actualizarAlumno,
} = require("../../controllers/alumnosController");
const { uploadToImgProfile } = require("../../utils/middlewares");

router.get("/:id", obtenerAlumno);
router.post("/registro", uploadToImgProfile.single("imagen"), registroAlumno);
router.put("/:id", uploadToImgProfile.single("imagen"), actualizarAlumno);

module.exports = router;
