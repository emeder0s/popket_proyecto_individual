const connection = require("../databases/sequelize");
const spaceModel = require("../models/space.model");

const spacer = {
  /**
   * Inserta un espacio un space
   * @param {json} req La petición
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
   * Actualiza los datos de un space 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  update: async (req, res) => {
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