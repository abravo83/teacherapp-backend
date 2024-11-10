const express = require("express");
const router = express.Router();
const {
  obtenerAlumno,
  registroAlumno,
  actualizarAlumno,
} = require("../../controllers/alumnosController");
const {
  checkRolAlumno,
  uploadToImgProfile,
} = require("../../utils/middlewares");

router.get("/:id", checkRolAlumno, obtenerAlumno);
router.post("/registro", uploadToImgProfile.single("imagen"), registroAlumno);
router.put("/:id", checkRolAlumno, actualizarAlumno);

module.exports = router;
