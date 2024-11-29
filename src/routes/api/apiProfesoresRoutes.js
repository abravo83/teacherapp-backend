const router = require("express").Router();
const {
  obtenerProfesores,
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
  validarDesvalidar,
  obtenerMateriasDeProfesor,
} = require("../../controllers/profesoresController");
const {
  uploadToImgProfile,
  checkRolAdministrador,
  checkToken,
  checkUsuarioById,
} = require("../../utils/middlewares");

router.get("/", obtenerProfesores);
router.get("/profesor-materias", obtenerMateriasDeProfesor);
router.get("/:id", obtenerProfesor);
router.post("/registro", uploadToImgProfile.single("imagen"), registroProfesor);
router.put(
  "/:id",
  checkToken,
  checkUsuarioById,
  uploadToImgProfile.single("imagen"),
  actualizarProfesor
);
router.put(
  "/validar/:id",
  checkToken,
  checkRolAdministrador,
  validarDesvalidar
);

module.exports = router;
