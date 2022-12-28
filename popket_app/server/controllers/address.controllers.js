const connection = require("../databases/sequelize");
const addressModel = require("../models/address.model");
const user = require("./user.controllers");

const address = {
  /**
   * Inserta un address
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { via_type, via_name, via_number, additional_address, postal_code, locality, province, country  } = req.body;
      var con = await connection.open();
      const addressM = await addressModel.create(con);
      const address = await addressM.create({ via_type, via_name, via_number, additional_address, postal_code, locality, province, country});
      await user.add_address(req,con,address.dataValues.id);
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un address 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      const { id, via_type, via_name, via_number, additional_address, postal_code, locality, province, country } = req.body;
      var con = await connection.open();
      const addressM = await addressModel.create(con);
      const address = await addressM.update({ via_type, via_name, via_number, additional_address, postal_code, locality, province, country }, {where :{id}})
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
      const addressM = await addressModel.create(con);
      const address = await addressM.findOne({ where: { id: req.params.id } })
      res.json(address);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un address.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const addressM = await addressModel.create(con);
      const address = await addressM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }, 
}

module.exports = address;