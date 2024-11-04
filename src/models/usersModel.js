const pool = require("../config/db");

function selectAllUsers() {
  return pool.query("select * from usuarios");
}

module.exports = { selectAllUsers };
