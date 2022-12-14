const connection = require("../databases/sequelize");
const spacerModel = require("../models/spacer.model");
const userModel = require("../models/user.model");
const session = require("./session.controllers");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const spacer = {
  /**
   * Inserta un spacer
   * @param {json} req La petición
   * @param {json} res Objeto respuesta
   */
  new: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, spacer_password } = req.body;
      var con = await connection.open();
      const userM = await userModel.create(con);
      const spacerM = await spacerModel.create(con);
      if (await userM.findOne({ where: { email } }) || await spacerM.findOne({ where: { email } })){
        res.json({validation:false,msn:"Ups!! Ya existe una cuenta con este email"});
      }else{
        const pass_hash = await bcyptjs.hash(spacer_password, 8);
        const spacer = await spacerM.create({ first_name, last_name, email, phone, spacer_password:pass_hash });
        const infoJwt = jwt.sign({ email, "id": spacer.dataValues.id, "first_name":spacer.dataValues.first_name }, "m1c4s4");
        res.json({"validation":true,"jwt":infoJwt, user:{first_name:spacer.dataValues.first_name, id:spacer.dataValues.id,isSpacer:true}});
      }
    } catch (ValidationError) {
        console.log(ValidationError);
        res.json(false);
    }finally{
        await connection.close(con);
    }
  },

  /**
   * Actualiza los datos de un spacer 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  edit: async (req, res) => {
    try {
      let id = session.get_id_from_cookie(req);
      const { first_name, last_name, phone } = req.body;
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      await spacerM.update({ first_name, last_name, phone }, {where :{id}})
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Actualiza la contraseña de un spacer 
   * @param {*} req la petición
   * @param {*} res la respuesta a la petición
   */
  editPassword: async (req, res) => {
    try {
      let id = session.get_id_from_cookie(req);
      const { old_password,new_password,repeat_password} = req.body;
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.findOne({ where: { id } });
      if (spacer) {
        let hashSaved = spacer.dataValues.spacer_password;
        if(bcyptjs.compareSync(old_password, hashSaved) ){
          if(new_password==repeat_password) {
            const spacer_password = await bcyptjs.hash(new_password, 8);
            await spacerM.update({ spacer_password }, {where :{id}});
            res.json({validation:true,msn:"Contraseña actualizada correctamente"}) 
          } else{
            res.json({validation:false,msn:"Las contraseñas no coinciden"});
          }
        }else{
          res.json({validation:false,msn:"La contraseña actual no es correcta"});
        }
      }else{
        res.json({validation:false,msn:"El usuario no existe"});
      }
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
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.findOne({ where: { id: req.params.id } })
      res.json(spacer);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },
  
  /**
     * Borra un spacer.
     * @param {json} req Objeto solicitud
     * @param {json} res Objeto respuesta
     */
  delete: async (req, res) => {
    try {
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.destroy({ where: { id:req.params.id } })
      res.json(true);
    } catch (ValidationError) {
        console.log(ValidationError);
      res.json(false);
    }finally{
      await connection.close(con);
    }
  },

  /**
   * Login del spacer
   * @param {json} req la petición
   * @param {json} res la respuesta de la petición
   */
  login: async (req, res) => {
    try {
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const { email, spacer_password } = req.body;
      const spacer = await spacerM.findOne({ where: { email } });
      if (spacer) {
          let hashSaved = spacer.dataValues.spacer_password;
          let compare = bcyptjs.compareSync(spacer_password, hashSaved);
          const infoJwt = jwt.sign({ email, "id": spacer.dataValues.id, "first_name":spacer.dataValues.first_name }, "m1c4s4");
          if (compare) {
            res.cookie("session", infoJwt)
            res.json({ validation: true, "jwt": infoJwt, spacer:spacer.dataValues });
          } else {
          res.json({validation:false,msn:"Ohh!! Usuario o contraseña incorrectos"});
           }
      } else {
        res.json({validation:false,msn:"Ohh!! Usuario o contraseña incorrectos"});
      }
    } catch (error) {
      res.json(error)
   
    } finally {
      await connection.close(con);
    }
  },

  /**
   * Devuelve si el usuario logueado es spacer o no
   * @param {json} req la petición
   * @param {json} res la respuesta a la petición
   */
  isSpacer: async (req,res) => {
    try{
      var email = session.get_email_from_cookie(req);
      var con = await connection.open();
      const spacerM = await spacerModel.create(con);
      const spacer = await spacerM.findOne({where :{email}});
      if (spacer){
        res.json(true);
      }else{
        console.log("noloes");
        res.json(false);
      }
    } catch (error) {
      res.json(error)
    } finally {
      await connection.close(con);
    }
  },

  /**
   * Añade el id de una dirección a un usuario
   * @param {int} fk_id_address el identificador de la dirección del usuario
   */
  add_address: async (req,con,fk_id_address) => {
    try {
      let id = session.get_id_from_cookie(req);
      console.log(id);
      console.log(fk_id_address);
      const spacerM = await spacerModel.create(con);
      await spacerM.update({ fk_id_address}, {where :{id}})
    } catch (ValidationError) {
        console.log(ValidationError);
    }
  }

}

module.exports = spacer;