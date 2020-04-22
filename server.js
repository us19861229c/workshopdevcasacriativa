//epress : criar e configurar servidor
const express = require('express');
const server = express();
const db = require('./db')

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views' , {
    express: server,
    noCache: true,
})

server.get('/', function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 3) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render('index.html', {ideas : lastIdeas})
    })
})

server.get('/ideias', function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows){
    if (err) return console.log(err)
    const reversedIdeas = [...rows].reverse()

    return res.render('ideias.html', {ideas: reversedIdeas})
  })
})

server.post('/', function(req, res){
  //Inserir dados na tabela
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES(?, ?, ?, ?, ?);
    `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  db.run(query, values, function(err){
    if (err) return console.log(err)

    return res.redirect('/ideias')
  })
})

server.get('/ideias/delete/:id', function(req, res) {
  const id = [req.params.id]

  db.run(`DELETE FROM ideas WHERE id = ?`, id, function(err) {
    if (err) return console.log(err)

    return res.redirect('/ideias')
  })
});


//ligar o servidor na porta 3001
server.listen(3001)