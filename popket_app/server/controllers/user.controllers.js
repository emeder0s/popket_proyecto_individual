const connection = require("../databases/sequelize");
const userModel = require("../models/user.model");
const spacerModel = require("../models/spacer.model");
const session = require("./session.controller");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const user = {
  /**
   * Inserta un user
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { first_name, last_name, email, phone="", user_password } = req.body;
      var con = await connection.open();
      const userM = await userModel.create(con);
      const spacerM = await spacerModel.create(con);
      if (await userM.findOne({ where: { email } }) || await spacerM.findOne({ where: { email } })){
        res.json({validation:"false",msn:"Ups!! Ya existe una cuenta con este email"});
      }else{
        const pass_hash = await bcyptjs.hash(user_password, 8);
        const user = await userM.create({ first_name, last_name, email, phone, user_password:pass_hash });
        const infoJwt = jwt.sign({ email, "id": user.dataValues.id, "first_name":user.dataValues.first_name }, "m1c4s4");
        res.json({"jwt":infoJwt, user:{"first_name":user.dataValues.first_name, "id":user.dataValues.id}});
      }
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
        await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un usuario 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      let id = session.get_id_from_cookie(req);
      const { first_name, last_name, phone } = req.body;
      var con = await connection.open();
      const userM = await userModel.create(con);
      await userM.update({ first_name, last_name, phone }, {where :{id}})
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
      const userM = await userModel.create(con);
      const user = await userM.findOne({ where: { id: req.params.id } })
      res.json(user);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un user.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const userM = await userModel.create(con);
      const user = await userM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Añade el id de una dirección a un usuario
   * @param {int} fk_id_address el identificador de la dirección del usuario
   */
  add_address: async (fk_id_address) => {
    try {
      let id = session.get_id_from_cookie(req);
      var con = await connection.open();
      const userM = await userModel.create(con);
      await userM.update({ fk_id_address}, {where :{id}})
    } catch (ValidationError) {
        console.log(ValidationError);
    }finally{
      await connection.close(con);
    }
  }

}

module.exports = user;