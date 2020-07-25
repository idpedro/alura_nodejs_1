const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app)=>{
    // retorna a requisições GET  na rota '/'
    app.get("/",(req,resp)=>{
        resp.marko(require('../views/index/index.marko'));
        // // var de retorno html
        // let html=`
        //     <html>
        //         <head>
        //             <meta charset='utf-8'>
        //             <title>Casa do Códgo</title>
        //         </head>
        //         <body>
        //             <h1>Casa do Códgo</h1>
        //         </body>
        //     </html>
        // `;
        // // responde a requisição
        // resp.send(html)
    });

    // retorna a requisições GET  na rota '/livros'
    app.get("/livros",(req,resp)=>{
        const livrodao = new LivroDao(db);
        // pega dados do sql
        livrodao.lista().then(
            // responde a requisição
            livros => resp.marko( require('../views/livros/lista/lista.marko') , {livros} )
       ).catch(erro => console.log(erro))
    });

    app.get('/livros/form',(req,resp)=>{
        // responde usando um template marko
        resp.marko(require('../views/livros/form/form.marko'),{livro:{}});
    })
    app.post('/livros',(req,resp)=>{
        console.log(req.body);
        // chama dao
        const livrodao = new LivroDao(db);
        // pega dados do sql
        livrodao.adiciona(req.body).then(
            resp.redirect('/livros')
       ).catch(erro => console.log(erro))
    
    })

    app.get('/livros/get/:id',(req,resp)=>{
        livroid=req.params.id;
        const livrodao = new LivroDao(db);
        livrodao.buscarPorId(livroid).then(

           livro => resp.send(livro)

        ).catch( erro => console.log(erro))
    })
    app.delete('/livros/:id',(req,resp)=>{
        livroid=req.params.id;
        const livrodao = new LivroDao(db);
        livrodao.remover(livroid)
        .then(()=> resp.status(200).end())
        .catch( erro => console.log(erro))
    })
    app.get('/livros/form/:id',(req,resp)=>{
        livroid=req.params.id;
        const livrodao = new LivroDao(db);
        livrodao.buscarPorId(livroid).then(

           livro => resp.marko(
               require("../views/livros/form/form.marko"),
               {livro,link:"/livros/update"}
            )
        
        ).catch( erro => console.log(erro))
    })
    app.put('/livros',(req,resp)=>{
        console.log(req.body);
        // chama dao
        const livrodao = new LivroDao(db);
        // pega dados do sql
        livrodao.atualizar(req.body).then(
            resp.redirect('/livros')
       ).catch(erro => console.log(erro))
    })
}