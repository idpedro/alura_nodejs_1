//carega o makro
require('marko/node-require').install(); // roda o marko no node
require('marko/express');  // chama o modulo pra o express
// o nodemon tem problema com o procesamento de arquivos .makro
// ele sempre reprocessa eles e pra resolver
// e necessario adicionar o comando abaixo no packeage.json
// npx nodemon server.js --ignore *.marko.js <- adicionado

// carega o modulo body-parser
// serve para tranforma o corpo de uma requisição 
// compativel com o nodede
const bodyParser = require('body-parser');

// varega o methodOverride
// serve para sobre escrever o metodo da request
const methodOverride = require('method-override');

// carrega o modulo do express
const express = require('express'); // retorna uma função
// chamar o 'construtor' do express
const app = express(); // executa a função


// Habilita do body parser
// a entender objetos complexos 
// como json, vindos por requests http
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride((req,resp)=>{
    if(req.body && typeof req.body==='object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// para pegar arquivos estaticos usamos o middleware do express
app.use('/estatico',express.static('src/app/public'))


const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;