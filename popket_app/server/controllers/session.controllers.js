const connection = require("../databases/sequelize");
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const session = {
    /**
     * Devuelve la id del usuario/spacer que tiene sesion iniciada
     * @param {json} req la petición
     * @returns {integer}
     */
    get_id_from_cookie: (req) => {
        let jwtVerify = jwt.verify(req.cookies.session, "m1c4s4");
        return jwtVerify.id
    },

  /**
   * Login del usuario/spacer
   * @param {json} req la petición
   * @param {json} res la respuesta de la petición
   */
  login: async (req, res) => {
    try {
      var con = await connection.open();
      const { email, password } = req.body;
      const userM = await userModel.create(con);
      const user = await userM.findOne({ where: { email } });
      if (user) {
          let hashSaved = user.dataValues.user_password;
          let compare = bcyptjs.compareSync(password, hashSaved);
          const infoJwt = jwt.sign({ email, "id": user.dataValues.id, "first_name":user.dataValues.first_name }, "m1c4s4");
          if (compare) {
            res.cookie("session", infoJwt)
            res.json({ validation: true, "jwt": infoJwt, user:user.dataValues });
          } else {
          res.json({validation:"false",msn:"Ohh!! Usuario o contraseña incorrectos"});
           }
      } else {
        const spacerM = await spacerModel.create(con);
        const spacer = await spacerM.findOne({ where: { email } });
        if (spacer) {
            let hashSaved = spacer.dataValues.spacer_password;
            let compare = bcyptjs.compareSync(password, hashSaved);
            const infoJwt = jwt.sign({ email, "id": spacer.dataValues.id, "first_name":spacer.dataValues.first_name }, "m1c4s4");
            if (compare) {
                res.cookie("session", infoJwt)
                res.json({ validation: true, "jwt": infoJwt, spacer:spacer.dataValues });
            } else {
            res.json({validation:"false",msn:"Ohh!! Usuario o contraseña incorrectos"});
            }
        } else {
            res.json({validation:"false",msn:"Ohh!! No existe cuenta vinculada a este email"});
        }
      }
    } catch (error) {
      res.json(error)
   
    } finally {
      await connection.close(con);
    }
  },

    /**
     * Log out del usuario/spacer - limpia la cookie con el JWT del navegador
     * @param {json} req la petición
     * @param {json} res la respuesta de la petición
     */
    logout: (req, res) => {
        var cookies = req.cookies;
        if (cookies) {
        var token = cookies.session;
        res.json(token);
        }
    }
}


module.exports = session;
