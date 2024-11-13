const router = require("express").Router();
const { getAllUsers, actualizarEstadoUsuario  } = require("../../controllers/usersController");

router.get("/", getAllUsers);
router.put("/activar/:id", actualizarEstadoUsuario);

module.exports = router;
