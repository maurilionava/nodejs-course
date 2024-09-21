const express = require('express') // importar módulo
const app = express() // iniciar módulo express
const port = 3000 // definir porta
const path = require('path')

const users = require('./users')

// middleware para bind dos dados enviados para JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

const baseDirectory = path.join(__dirname, 'templates')

// tratamento de rotas
app.use('/users', users)

// criar rota GET padrão da aplicação
app.get('/', (req, res) => {
    res.sendFile(`${baseDirectory}/index.html`)
})

// criar middleware que responde com status 404 as rotas inexistentes
app.use((req, res, next) => {
    res.status(404).sendFile(`${baseDirectory}/404.html`)
})

// iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http:localhost://${port}`)
})