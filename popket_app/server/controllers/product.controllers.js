const connection = require("../databases/sequelize");
const productModel = require("../models/product.model");
const orderProduct = require("./orders_products.controllers");

const product = {
  /**
   * Inserta un product
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { product_name, description, price, image, fk_id_space  } = req.body;
      var con = await connection.open();
      const productM = await productModel.create(con);
      const product = await productM.create({ product_name, description, price, image, fk_id_space })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un product 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id,product_name, description, price, image } = req.body;
      var con = await connection.open();
      const productM = await productModel.create(con);
      const product = await productM.update({ product_name, description, price, image }, {where :{id}})
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
      const productM = await productModel.create(con);
      const product = await productM.findOne({ where: { id: req.params.id } })
      res.json(product);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un product.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const productM = await productModel.create(con);
      const product = await productM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  getByOrder: async(fk_id_order,con) => {
    var orderProducts = await orderProduct.getByOrder(fk_id_order,con);
    if (orderProducts){
      const productM = await productModel.create(con);
      const products = await Promise.all(orderProducts.map(async element =>{
        var product = await productM.findOne({ where: { id:element.dataValues.fk_id_product } });
        return {product, quantity:element.dataValues.quantity}
      }));
      return products;
    }else{
      return [];
    }
  }
}

module.exports = product;