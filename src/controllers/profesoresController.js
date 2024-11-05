const { insertProfesor, updateProfesor, selectProfesorById } = require('../models/profesorModel');

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
        const nuevoProfesor = await insertProfesor(req.body);
        res.json(nuevoProfesor);
    } catch (error) {
        next(error);
    }
};

const actualizarProfesor = async (req, res, next) => {
    try {
        const profesorActualizado = await updateProfesor(req.params.id, req.body);
        if (!profesorActualizado) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesorActualizado);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerProfesor,
    registroProfesor,
    actualizarProfesor
};
