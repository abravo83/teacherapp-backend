const router = require("express").Router();

router.use('/usuarios', require('./api/apiusersRoutes'));
router.use('/profesores', require('./api/apiProfesoresRoutes'));
router.use('/alumnos', require('./api/apiAlumnosRoutes'));
router.use('/materias', require('./api/apiMateriasRoutes'));
router.use('/login', require('./api/apiLoginRoutes'));
router.use("/mensajes", require("./api/apiMensajesRoutes"));

module.exports = router;
