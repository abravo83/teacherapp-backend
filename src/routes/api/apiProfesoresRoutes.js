const router = require('express').Router();
const { obtenerProfesor, registroProfesor, actualizarProfesor } = require('../../controllers/profesoresController');

router.get('/:id', checkRolProfesor, obtenerProfesor)
router.post('/registro', registroProfesor);
router.put('/:id', checkRolProfesor, actualizarProfesor);

module.exports = router;