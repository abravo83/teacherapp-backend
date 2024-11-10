const router = require("express").Router();
const {
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
} = require("../../controllers/profesoresController");
const {
  checkRolProfesor,
  uploadToImgProfile,
} = require("../../utils/middlewares");

router.get("/:id", checkRolProfesor, obtenerProfesor);
router.post("/registro", uploadToImgProfile.single("imagen"), registroProfesor);
router.put(
  "/:id",
  checkRolProfesor,
  uploadToImgProfile.single("imagen"),
  actualizarProfesor
);

module.exports = router;
