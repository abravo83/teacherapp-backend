const router = require('express').Router();

router.use('/users', require('./api/apiUsersRoutes'));
router.use('/profesores', require('./api/apiProfesoresRoutes'));
router.use('/alumnos', require('./api/apiAlumnosRoutes'));
router.use('/materias', require('./api/materias.routes'));
router.use('/login', require('./api/apiLoginRoutes'));


module.exports = router; 