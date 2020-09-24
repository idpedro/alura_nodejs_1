const { check} = require('express-validator/check');

class Livro {
    static validate(){
        return [
            check('titulo').isLength({min:5}).withMessage("O título precissa ter no minimo 5 caracteres."),
            check('preco').isCurrency().withMessage('O Preço precisa ter um valro monetario valido') 
        ];
    }
}

module.exports = Livro;