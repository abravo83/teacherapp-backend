const router = require("express").Router();
const {
  obtenerProfesores,
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar
  
} = require("../../controllers/profesoresController");
const {
  uploadToImgProfile,
  checkRolAdministrador
} = require("../../utils/middlewares");

router.get('/', obtenerProfesores);
router.get("/:id", obtenerProfesor);
router.post("/registro", uploadToImgProfile.single("imagen"), registroProfesor);
router.put(
  "/:id",
  uploadToImgProfile.single("imagen"),
  actualizarProfesor
);
router.put("/validar/:id", validarDesvalidar);


module.exports = router;
