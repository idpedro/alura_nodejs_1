const Livro = require('../model/livro');
const LivrosController = require("../controller/LivrosController");

const livrosController = new LivrosController();

module.exports = (app) => {

    const rotasLivro = LivrosController.rotas();
    
    app.get(rotasLivro.lista,livrosController.lista());
    app.route(rotasLivro.cadastroform)
        .get(livrosController.formulario())
        .post(Livro.validate(), livrosController.insere())
        .put(livrosController.atualizar());
    app.get(rotasLivro.atualiza,livrosController.buscar());
    app.delete(rotasLivro.deleta, livrosController.deletar());
};