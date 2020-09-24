
class BaseController{
    static rotas(){
        return {
            index:"/"
        }
    }
    index(){
        return function(req,resp){ 
            return resp.marko(require('../views/base/home/home.marko'));
        }
    }

};

module.exports = BaseController;