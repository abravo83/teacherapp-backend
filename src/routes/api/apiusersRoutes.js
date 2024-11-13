const router = require("express").Router();
const { getAllUsers, activarDesactivarUsuarioC } = require("../../controllers/usersController");

router.get("/", getAllUsers);
router.put("/activar/:id", activarDesactivarUsuarioC);

module.exports = router;
