const connection = require("../databases/sequelize");
const spacerModel = require("../models/spacer.model");

const spacer = {
  /**
   * Inserta un spacer
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { first_name, last_name, email, phone="", spacer_password  } = req.body;
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.create({ first_name, last_name, email, phone, spacer_password })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un spacer 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id,first_name, last_name, email, phone, spacer_password  } = req.body;
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.update({ first_name, last_name, email, phone, spacer_password  }, {where :{id}})
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  show: async (req, res) => {
    try {
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.findOne({ where: { id: req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  
  /**
     * Borra un spacer.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.destoy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = spacer;