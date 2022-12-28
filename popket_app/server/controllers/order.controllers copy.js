const connection = require("../databases/sequelize");
const orderModel = require("../models/order.model");

const order = {
  /**
   * Inserta un order
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { num_order, address, total_account, products, quantity } = req.body;
      var con = await connection.open();
      const orderM = await orderModel.create(con);
      const order = await orderM.create({ num_order, address, total_account })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un order 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id, num_order, address, total_account, products, quantity } = req.body;
      var con = await connection.open();
      const orderM = await orderModel.create(con);
      const order = await orderM.update({ num_order, address, total_account }, {where :{id}})
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
      const orderM = await orderModel.create(con);
      const order = await orderM.findOne({ where: { id: req.params.id } })
      res.json(order);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un order.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const orderM = await orderModel.create(con);
      const order = await orderM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = order;