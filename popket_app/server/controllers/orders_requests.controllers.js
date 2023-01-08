const connection = require("../databases/sequelize");
const orderRequestModel = require("../models/orders_requests.model");
const space = require("./space.controllers");
const order = require("./order.controllers");

const orderRequest = {
  /**
   * Inserta un orderRequest
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (fk_id_order,spaces, con) => {    
    try {
      const orderRequestM = await orderRequestModel.create(con);
      await Promise.all(spaces.map(async(fk_id_space) => {
          await orderRequestM.create({ fk_id_space, fk_id_order,state:"pending" })
      }))
    } catch (ValidationError) {
        console.log(ValidationError);
    }
  },

  /**
   * Devuelve las peticiones pendientes de un space
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
    getBySpace: async (fk_id_space,con) => {
        const orderRequestM = await orderRequestModel.create(con);
        const ordersRequests = await orderRequestM.findAll({ where: { fk_id_space, state:"pending" } });
        return ordersRequests;
  },

    /**
   * Devuelve todas las peticiones space
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
    getAllBySpace: async (fk_id_space,con) => {
      const orderRequestM = await orderRequestModel.create(con);
      const ordersRequests = await orderRequestM.findAll({ where: { fk_id_space } });
      return ordersRequests;
},

  show: async (req, res) => {
    try {
      var con = await connection.open();
      const orderRequestM = await orderRequestModel.create(con);
      const orderRequest = await orderRequestM.findOne({ where: { id: req.params.id } })
      res.json(orderRequest);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un orderRequest.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const orderRequestM = await orderRequestModel.create(con);
      const orderRequest = await orderRequestM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
}

module.exports = orderRequest;