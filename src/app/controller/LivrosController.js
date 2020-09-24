const LivroDao = require('../infra/livro-dao');
const { check, validationResult } = require('express-validator/check');

const Templates= require('../views/Templates');
const db = require('../../config/database');

class LivrosController{

    static rotas(){
        return{
            lista:'/livros',
            cadastroform:'/livros/form',
            atualiza:'/livros/form/:id',
            deleta:'/livros/:id'
        }
    }
    
    lista(){
        return (req, resp)=>{
            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => resp.marko(
                    Templates.livros.lista,
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
        }
    }

    insere(){
        return function(req, resp) {
        console.log(req.body);

        const erros = validationResult(req);

        if(!erros.isEmpty()){
            return resp.marko(
                Templates.livros.form,
                {
                    livro: req.body,
                    errosValidacao:erros.array()
                }
            )
        }

        const livroDao = new LivroDao(db);
    
        livroDao.adiciona(req.body)
                .then(resp.redirect(LivrosController.rotas().lista))
                .catch(erro => console.log(erro));
        }
    }
    buscar(){
        return (req, resp)=>{
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                    .then(livro => 
                        resp.marko(
                            Templates.livros.form, 
                            { livro: livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        }
    }
    formulario(){
        return (req, resp)=>{
            resp.marko(Templates.livros.form, { livro: {} });
        }
    }

    atualizar(){
        return (req, resp)=>{
            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(req.body)
                    .then(resp.redirect(LivrosController.rotas().lista))
                    .catch(erro => console.log(erro));
        }
    }

    deletar(){
        return (req, resp)=>{
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        }
    }

}

module.exports=LivrosController;