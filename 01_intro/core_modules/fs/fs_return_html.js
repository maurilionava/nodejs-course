const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req, res) => {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, { 'Content-Type' : 'text/html' })
        res.write(data)
        return res.end()
    })
})

server.listen(port, (err) => {
    console.log(`Rodando na porta http://localhost:${port}`)
})