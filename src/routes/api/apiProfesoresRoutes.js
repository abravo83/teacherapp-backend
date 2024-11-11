const router = require("express").Router();
const {
  obtenerProfesor,
  registroProfesor,
  actualizarProfesor,
} = require("../../controllers/profesoresController");
const {
  uploadToImgProfile,
} = require("../../utils/middlewares");

router.get("/:id", obtenerProfesor);
router.post("/registro", uploadToImgProfile.single("imagen"), registroProfesor);
router.put(
  "/:id",
  uploadToImgProfile.single("imagen"),
  actualizarProfesor
);

module.exports = router;
