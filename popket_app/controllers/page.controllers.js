
const pages = {
    /**
     * Renderiza la página principal
     * @param {json} req Objeto solicitudObjeto solicitud
     * @param {json} res Objeto respuestaObjeto respuesta
     */
     home: (req, res) => {
        res.render("./home.ejs");
 },

};

module.exports = pages;