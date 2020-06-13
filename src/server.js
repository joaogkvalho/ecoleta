const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos para nossa aplicação
//pagina inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
   return res.render("index.html", {title: 'E-GIRLS NÃO TOMAM BANHO'})
})


server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa URL
    // console.log(req.query)

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
      
    //req.body: O corpo do nosso formulario
    // console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
    
})


server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco de daodos
    db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        
        const total = rows.length

        //mostrar a pagina HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })  
})

//ligar o servidor
server.listen(3000)