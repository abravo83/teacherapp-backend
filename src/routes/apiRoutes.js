const router = require('express').Router();

router.use('/users', require('./api/apiUsersRoutes'));
router.use('/profesores', require('./api/apiProfesoresRoutes'));

module.exports = router; 