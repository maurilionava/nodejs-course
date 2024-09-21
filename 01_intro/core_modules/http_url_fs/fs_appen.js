const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name

    if(!name)
    {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            return res.end()   
        })
    } 
    else 
    {
        const nameToAppend = `${name},`
        fs.appendFile('arquivo-append.txt', nameToAppend, function(err) {
            res.writeHead(302, { Location: '/' })
            return res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Servindor rodando em http://localhost:${port}`)
})