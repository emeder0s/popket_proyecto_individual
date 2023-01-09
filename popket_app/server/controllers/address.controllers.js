const connection = require("../databases/sequelize");
const addressModel = require("../models/address.model");
const user = require("./user.controllers");
const spacer = require("./spacer.controllers");

const address = {
  /**
   * Inserta un address a un usuario
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  newForUser: async (req, res) => {
    try {
      const { via_type, via_name, via_number, additional_address, postal_code, locality, province, country  } = req.body;
      var con = await connection.open();
      const addressM = await addressModel.create(con);
      const address = await addressM.create({ via_type, via_name, via_number, additional_address, postal_code, locality, province, country});
      await user.add_address(req,con,address.dataValues.id);
      res.json(address);
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
      await connection.close(con);
    }
  },

   /**
   * Inserta un address a un spacer
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
   newForSpacer: async (req, res) => {
    try {
      const { via_type, via_name, via_number, additional_address, postal_code, locality, province, country  } = req.body;
      var con = await connection.open();
      const addressM = await addressModel.create(con);
      const address = await addressM.create({ via_type, via_name, via_number, additional_address, postal_code, locality, province, country});
      await spacer.add_address(req,con,address.dataValues.id);
      res.json(address);
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
      const address = await addressM.update({ via_type, via_name, via_number, additional_address, postal_code, locality, province, country }, {where:{id}})
      res.json(await addressM.findOne({where:{id}}));
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

  /**
   * Devuelve la dirección de un spacer
   * @param {json} req la petición
   * @param {json} res la respuesta de la petición
   */
  getBySpacer: async(req,res) =>{
    try {
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.findOne({ where: { id: req.params.id } })
      const addressM = await addressModel.create(con);
      const address = await addressM.findOne({ where: { id: spacer.dataValues.fk_id_address} })
      res.json(address);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Devuelve la dirección de un usuario
   * @param {json} req la petición
   * @param {json} res la respuesta de la petición
   */
  getByUser: async(req,res) =>{
    try {
      var con = await connection.open();
      const userM = await userModel.create(con);
      const user = await userM.findOne({ where: { id: req.params.id } })
      const addressM = await addressModel.create(con);
      const address = await addressM.findOne({ where: { id: user.dataValues.fk_id_address} });
      res.json(address);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  }
}

module.exports = address;