const bcrypt = require("bcryptjs");

const { createToken } = require("../utils/helpers");
const { selectAllUsers } = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  try {
    const [result] = await selectAllUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers };
