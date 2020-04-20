//epress : criar e configurar servidor
const express = require('express');
const server = express();

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views' , {
    express: server,
})

//criar rota
//capturar o pedido do cliente e responder  
server.get('/', function(req, res) {
    return res.render("index.html")
});

server.get('/ideias', function(req, res) {
    return res.render("ideias.html")
});

//ligar o servidor na porta 3001
server.listen(3001)