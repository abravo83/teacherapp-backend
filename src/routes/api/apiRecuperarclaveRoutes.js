const {
  enviarEmail,
  actualizarpass,
} = require("../../controllers/recuperarClaveController");

const router = require("express").Router();

router.post("/", enviarEmail);
router.post("/restablecermiclave", actualizarpass);

module.exports = router;
