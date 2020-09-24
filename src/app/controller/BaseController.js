const Templates= require('../views/Templates');


class BaseController{
    static rotas(){
        return {
            index:"/",
            login:"/login"
        }
    }
    index(){
        return function(req,resp){ 
            return resp.marko(Templates.base.home);
        }
    }
    login(){
        return function(req,resp){
            return resp.marko(Templates.base.login)
        }
    }

    efetuaLogin(){
        return function(req,resp){
            return resp.marko(Templates.base.login)
        }
    }
};

module.exports = BaseController;