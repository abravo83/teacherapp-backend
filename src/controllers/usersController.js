const bcrypt = require("bcryptjs");

const { createToken } = require("../utils/helpers");
const { selectAllUsers, activarDesactivarUsuario } = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  try {
    const [result] = await selectAllUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const activarDesactivarUsuarioC = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const result = await activarDesactivarUsuario(activo);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ id, activo });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado del usuario", error });
  }
};

module.exports = { getAllUsers, activarDesactivarUsuarioC };
