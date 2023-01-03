const connection = require("../databases/sequelize");
const userSpacerOrderModel = require("../models/users_spacers_orders.model");

const userSpacerOrder = {
  /**
   * Inserta un userSpacerOrder
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (id_user_spacer, fk_id_order, name_table, con) => {
    try {
      const userSpacerOrderM = await userSpacerOrderModel.create(con);
      const userSpacerOrder = await userSpacerOrderM.create({ id_user_spacer, fk_id_order, name_table });
    } catch (ValidationError) {
        console.log(ValidationError);
    }
  },

  getOrders: async (req,con) =>{
    try{
      const userSpacerOrderM = await userSpacerOrderModel.create(con);
      const userSpacerOrders = await userSpacerOrderM.findAll({ where:{id_user_spacer:req.params.id_user_spacer, name_table:req.params.name_table} });
      return userSpacerOrders;
    } catch (ValidationError) {
      console.log(ValidationError);
      return false;
    }
  }
}

module.exports = userSpacerOrder;