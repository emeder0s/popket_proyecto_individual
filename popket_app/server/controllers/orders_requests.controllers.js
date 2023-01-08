const connection = require("../databases/sequelize");
const orderRequestModel = require("../models/orders_requests.model");

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
          await orderRequestM.create({ fk_id_space, fk_id_order })
      }))
    } catch (ValidationError) {
        console.log(ValidationError);
    }
  },

  // /**
  //  * Actualiza los datos de un orderRequest 
  //  * @param {*} req la petición
  //  * @param {*} res la respuesta a la petición
  //  */
  // edit: async (req, res) => {
  //   try {
  //     const { id, num_orderRequest, address, total_account, products, quantity } = req.body;
  //     var con = await connection.open();
  //     const orderRequestM = await orderRequestModel.create(con);
  //     const orderRequest = await orderRequestM.update({ num_orderRequest, address, total_account }, {where :{id}})
  //     res.json(true);
  //   } catch (ValidationError) {
  //       console.log(ValidationError);
  //     res.json(false);
  //   }finally{
  //     await connection.close(con);
  //   }
  // },

  // show: async (req, res) => {
  //   try {
  //     var con = await connection.open();
  //     const orderRequestM = await orderRequestModel.create(con);
  //     const orderRequest = await orderRequestM.findOne({ where: { id: req.params.id } })
  //     res.json(orderRequest);
  //   } catch (ValidationError) {
  //       console.log(ValidationError);
  //     res.json(false);
  //   }finally{
  //     await connection.close(con);
  //   }
  // },
  
  // /**
  //    * Borra un orderRequest.
  //    * @param {json} req Objeto solicitud
  //    * @param {json} res Objeto respuesta
  //    */
  // delete: async (req, res) => {
  //   try {
  //     var con = await connection.open();
  //     const orderRequestM = await orderRequestModel.create(con);
  //     const orderRequest = await orderRequestM.destroy({ where: { id:req.params.id } })
  //     res.json(true);
  //   } catch (ValidationError) {
  //       console.log(ValidationError);
  //     res.json(false);
  //   }finally{
  //     await connection.close(con);
  //   }
  // },

  getBySpacer: async (fk_id_order,con) => {
    try {
      const orderRequestM = await orderRequestModel.create(con);
      const orderRequests = await orderRequestM.findAll({ where: { fk_id_order } })
       return orderRequests;
    } catch (ValidationError) {
        console.log(ValidationError);
        return 
    }
  },
}

module.exports = orderRequest;