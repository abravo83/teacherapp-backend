const { insertProfesor, updateProfesor, selectProfesorById } = require('../models/profesorModel');
const bcrypt = require('bcryptjs');

const obtenerProfesor = async (req, res, next) => {
    try {
        const profesor = await selectProfesorById(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        next(error);
    }
};

const registroProfesor = async (req, res, next) => {
    try {
        req.body.usuario.password = await bcrypt.hash(req.body.usuario.password, 8);
        const profesorId = await insertProfesor(req.body);
        const profesor = await selectProfesorById(profesorId);
        res.json(profesor);
    } catch (error) {
        next(error);
    }
};

const actualizarProfesor = async (req, res, next) => {
    try {
        if (req.body.usuario.password) {
            req.body.usuario.password = await bcrypt.hash(req.body.usuario.password, 8);
        }
        const profesorActualizado = await updateProfesor(req.params.id, req.body);
        if (!profesorActualizado) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(await selectProfesorById(profesorActualizado));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerProfesor,
    registroProfesor,
    actualizarProfesor
};
