const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const spaceModel = require("../models/space.model");

const spacer = {
  /**
   * Añade un space.
   * @param {json} req Objeto solicitud
   * @param {json} res Objeto respuesta
   */
  add: async (req, res) => {
    try {
      const { name_space, state, description } = req.body;
      const space = await spaceModel.create({ name_space, state, description })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }
  },
  
  /**
     * Borra un space.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      const id = req.body;
      const space = await spaceModel.create({ name_space, state, description })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }
  },

  
   
}

module.exports = spacer;