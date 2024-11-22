const {
  selectAllOpiniones,
  selectOpinionesByProfesorId,
  selectOpinionesByAlumnoId,
  deleteOpinionById,
} = require("../models/opinionesModel");

const getAllOpiniones = async (req, res, next) => {
  try {
    const [opiniones] = await selectAllOpiniones();
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const getOpinionesByProfesorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opiniones = await selectOpinionesByProfesorId(id);
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const getOpinionesByAlumnoId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opiniones = await selectOpinionesByAlumnoId(id);
    res.status(200).json(opiniones);
  } catch (error) {
    next(error);
  }
};

const createOpinion = async (req, res, next) => {
  try {
    const opinion = req.body;
    const result = await insertOpinion(opinion);
    const nuevaOpinion = await selectOpinionById(result.insertId);
    res.status(201).json(nuevaOpinion);
  } catch (error) {
    next(error);
  }
};

const updateOpinion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opinion = req.body;
    const opinionActualizada = await updateOpinionById(id, opinion);
    res.status(200).json(opinionActualizada);
  } catch (error) {
    next(error);
  }
};

const deleteOpinion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opinionEliminada = await deleteOpinionById(id);
    res.status(200).json(opinionEliminada);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOpiniones,
  getOpinionesByProfesorId,
  getOpinionesByAlumnoId,
  createOpinion,
  updateOpinion,
  deleteOpinion,
};
