const connection = require("../databases/sequelize");
const orderProductModel = require("../models/orders_products.model");

const orderProduct = {
  /**
   * Inserta un orderProduct
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (fk_id_product, fk_id_order, quantity, con) => {
    try {
      const orderProductM = await orderProductModel.create(con);
      const orderProduct = await orderProductM.create({ fk_id_product, fk_id_order, quantity });
    } catch (ValidationError) {
        console.log(ValidationError);
    }
  },

  /**
   * Actualiza los datos de un orderProduct 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id, num_orderProduct, address, total_account, products, quantity } = req.body;
      var con = await connection.open();
      const orderProductM = await orderProductModel.create(con);
      const orderProduct = await orderProductM.update({ num_orderProduct, address, total_account }, {where :{id}})
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
      const orderProductM = await orderProductModel.create(con);
      const orderProduct = await orderProductM.findOne({ where: { id: req.params.id } })
      res.json(orderProduct);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un orderProduct.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const orderProductM = await orderProductModel.create(con);
      const orderProduct = await orderProductM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = orderProduct;