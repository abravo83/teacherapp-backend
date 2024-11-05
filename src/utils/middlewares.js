const pool = require('../config/db');

const jwt = require('jsonwebtoken');



const checkToken = async (req, res, next) => {
  
}

async function checkRolProfesor(req, res, next) {
    const profesorId = req.params.id || req.body.usuario?.id;

    if (!profesorId) {
        return res.status(400).json({ message: 'ID de profesor no proporcionado' });
    }

    try {
        const [usuario] = await pool.query('SELECT rol FROM usuarios WHERE id = ?', [profesorId]);
        
        if (usuario.length === 0 || usuario[0].rol !== 'profesor') {
            return res.status(403).json({ message: 'Acceso denegado: el usuario no es un profesor' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el rol de profesor' });
    }
}


module.exports = {
    checkToken, checkRolProfesor
}