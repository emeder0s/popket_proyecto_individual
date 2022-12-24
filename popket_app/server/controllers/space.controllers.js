const connection = require("../databases/sequelize");
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
      var fk_id_spacer = "1"; //AQUÍ HABRÁ QUE RECOGER EL ID DEL SPACE LOGUEADO
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.create({ name_space, state, description, fk_id_spacer })
      res.json(true);
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
      res.json(true);
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
      const space = await spaceM.destoy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = space;