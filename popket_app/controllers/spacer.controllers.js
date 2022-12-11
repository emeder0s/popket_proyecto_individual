const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const spacerModel = require("../models/spacer.model");

const spacer = {
  /**
   * Devuelve todos los usuarios
   * @param {json} req Objeto solicitud
   * @param {json} res Objeto respuesta
   */
   findAll: async (req, res) => {
    const spacers = await spacers.findAll();
    res.json(spacers);
  },

  /**
   * Registra un usuario en la base de datos encriptando previamente la contraseña.
   * @param {json} req Objeto solicitud
   * @param {json} res Objeto respuesta
   */
  sigin: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, spacer_password } = req.body;
      const spacer_password_hash = await bcyptjs.hash(spacer_password, 8);
      const spacer = await spacerModel.create({ first_name, last_name, email, phone, "spacer_password": spacer_password_hash })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }
  },
   
}

module.exports = spacer;