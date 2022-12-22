const connection = require("../databases/sequelize.js");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const user = {
  /**
   * Devuelve todos los usuarios
   * @param {json} req Objeto solicitud
   * @param {json} res Objeto respuesta
   */
   findAll: async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
  },

  /**
   * Registra un usuario en la base de datos encriptando previamente la contraseña.
   * @param {json} req Objeto solicitud
   * @param {json} res Objeto respuesta
   */
  sigin: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, user_password } = req.body;
      const user_password_hash = await bcyptjs.hash(user_password, 8);
      const con = await connection.conn();
      const user = await userModel.create(con);
      await user.create({ first_name, last_name, email, phone, "user_password": user_password_hash })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }
  },
   
}

module.exports = user;