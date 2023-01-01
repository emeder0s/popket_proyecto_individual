const connection = require("../databases/sequelize");
const session = require("./session.controllers");
const spaceModel = require("../models/space.model");

const space = {
  /**
   * Inserta un space
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { name_space, state, description } = req.body;
      var fk_id_spacer = session.get_id_from_cookie(req);
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.create({ name_space, state, description, fk_id_spacer })
      res.json(space.dataValues.id);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un space 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id,name_space, state, description } = req.body;
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.update({ name_space, state, description }, {where :{id}})
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
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.findOne({ where: { id: req.params.id } })
      res.json(space);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
     * Borra un space.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 

  /**
   * Devuelve el id del space de un usuario, si existe. 
   */
  getByUser: async (req,res) => {
    try {
      var fk_id_spacer = session.get_id_from_cookie(req);
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.findOne({where :{fk_id_spacer}})
      res.json(space.dataValues.id);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }
}

module.exports = space;