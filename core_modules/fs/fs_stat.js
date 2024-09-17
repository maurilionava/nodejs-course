const fs = require('fs')

fs.stat('arquivo.txt', (err, data) => {
    if(err){
        console.log(`Erro: ${err}`)
        return
    }

    console.log(data)
    console.log(`IsFile? ${data.isFile()}`)
    console.log(`IsDirectory? ${data.isDirectory()}`)
    console.log(`IsSymbolicLink? ${data.isSymbolicLink()}`)
    return
})