const connection = require("../databases/sequelize");
const session = require("./session.controllers");
const spaceModel = require("../models/space.model");
const order = require("./order.controllers");
const product = require("./product.controllers");
const orderRequest = require("./orders_requests.controllers");

const space = {
  /**
   * Devuelve todos los spaces
   * @param {json} req la petición
   * @param {json} res la respuesta a la petición
   */
  getAll: async (req,res) => {
    try {
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const spaces = await spaceM.findAll({ where: { state:"public" } });
      res.json(spaces);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Inserta un space
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      var { name_space, state, description } = req.body;
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
  * @param {json} req Objeto solicitud
  * @param {json} res Objeto respuesta
  */
  getByUser: async (req,res) => {
    try {
      var fk_id_spacer = session.get_id_from_cookie(req);
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.findOne({where :{fk_id_spacer}})
      res.json({space_id:space.dataValues.id,validation:true});
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
    * Devuelve un space de una spacer.
    * @param {json} req Objeto solicitud
    * @param {json} res Objeto respuesta
    */
  showBySpacer: async (req,res) => {
    try {
      var fk_id_spacer = session.get_id_from_cookie(req);
      var con = await connection.open();
      const spaceM = await spaceModel.create(con);
      const space = await spaceM.findOne({where :{fk_id_spacer}})
      res.json(space.dataValues);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  getAllOrdersRequest: async (req,res) => {
      try {
        var con = await connection.open();
        var fk_id_spacer = req.params.spacer_id;
        const spaceM = await spaceModel.create(con);
        const space = await spaceM.findOne({where :{fk_id_spacer}})
        const orderRequests = await orderRequest.getBySpace(space.dataValues.id,con)
        res.json(orderRequests);
      } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
      }finally{
        await connection.close(con);
      }
  },

  getSpacerFromSpace: async (id,con)=> {
    const spaceM = await spaceModel.create(con);
    const space = await spaceM.findOne({where :{id}})
    return space.dataValues.fk_id_spacer;
  }

}

module.exports = space;