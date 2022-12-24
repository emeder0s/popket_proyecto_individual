const connection = require("../databases/sequelize");
const userModel = require("../models/user.model");

const user = {
  /**
   * Inserta un user
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { first_name, last_name, email, phone="", user_password  } = req.body;
      var con = await connection.open();
      const userM = await userModel.create(con);
      const user = await userM.create({ first_name, last_name, email, phone, user_password })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un user 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id,first_name, last_name, email, phone, user_password  } = req.body;
      var con = await connection.open();
      const userM = await userModel.create(con);
      const user = await userM.update({ first_name, last_name, email, phone, user_password  }, {where :{id}})
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
      const userM = await userModel.create(con);
      const user = await userM.findOne({ where: { id: req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  
  /**
     * Borra un user.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const userM = await userModel.create(con);
      const user = await userM.destoy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = user;