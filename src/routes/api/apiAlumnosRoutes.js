const express = require('express');
const router = express.Router();
const { obtenerAlumno, registroAlumno, actualizarAlumno } = require('../../controllers/alumnosController');
const { checkRolAlumno } = require('../../utils/middlewares');

router.get('/:id', checkRolAlumno, obtenerAlumno);
router.post('/registro', registroAlumno); 
router.put('/:id', checkRolAlumno, actualizarAlumno);

module.exports = router;
