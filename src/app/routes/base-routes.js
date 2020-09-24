const BaseController = require('../controller/BaseController'); 
const baseController = new BaseController();

module.exports = (app) => {
    const rotasBase = BaseController.rotas();
    app.get(rotasBase.index, baseController.index());
    app.route(rotasBase.login)
    .get(baseController.login())
    .post(baseController.efetuaLogin());
};