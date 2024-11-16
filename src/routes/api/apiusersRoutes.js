const router = require("express").Router();
const { getAllUsers, actualizarEstadoUsuario  } = require("../../controllers/usersController");
const {
    uploadToImgProfile,
    checkToken,
    checkRolAdministrador
  } = require("../../utils/middlewares");

router.get("/", getAllUsers);
router.put("/activar/:id", checkToken, checkRolAdministrador, actualizarEstadoUsuario);

module.exports = router;
