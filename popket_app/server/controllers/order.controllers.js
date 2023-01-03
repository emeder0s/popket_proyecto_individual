const connection = require("../databases/sequelize");
const orderModel = require("../models/order.model");
const orderProduct = require("./orders_products.controllers");
const userSpacerOrder = require ("./users_spacers_orders.controllers")
const session = require("./session.controllers");
const product = require("./product.controllers");


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
      const order = await orderM.create({ num_order, address, total_account });
      await Promise.all(products.map(async (product, index) =>{
        await orderProduct.new(product,order.dataValues.id,quantity[index],con);
        }
      ));
      var table = await session.is_user_or_spacer(session.get_email_from_cookie(req),con);
      await userSpacerOrder.new(session.get_id_from_cookie(req),order.dataValues.id,table, con);
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

  getOrders: async (req,res) => {
    try{
      var con = await connection.open();
      const userSpacerOrders = await userSpacerOrder.getOrders(req,con);
      if (userSpacerOrders){
        const orderM = await orderModel.create(con);
        const orders = await Promise.all(userSpacerOrders.map(async element =>{
            var order = await orderM.findOne({ where: { id:element.dataValues.fk_id_order } });
            var products = await product.getByOrder(order.dataValues.id,con);
            order = order.dataValues;
            order.products = products;
            return order;
        }));
        res.json(orders);
      }else{
        res.json(false)
      }
    } catch (ValidationError) {
      console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }
}

module.exports = order;