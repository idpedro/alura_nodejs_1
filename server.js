//com express
// carrega o modulo constomizado do express
const app = require('./src/config/custom_express'); // retorna uma função
const port=3000 // porta que sera usada para o servidor

// inicia o servidors
app.listen(port,()=>{
    // log de mensagem de inicio
    console.log("< Listen 0.0.0.0:3000 >")    
})



// sem express
/* const http =require('http');//Importando modulo http do node

// inicia o servidor
const servidor = http.createServer( 
    (req,resp)=>{ // função anonima quer responde as requisicoes (funcao Callback)
        resp.end(`
        <html>
            <head>
                <meta charset='utf-8'>
                <title>Teste node</title>
            </head>
            <body>
                <h1>Casa do Códgo</h1>
            </body>
        </html>
        `)
        console.log("Requsisão Recebida")
    }
);

servidor.listen(3000); // start o servidor na porta 3000
/// pode ser passado qual ip sera ouvido
// servidor.listen(porta,ip ) */