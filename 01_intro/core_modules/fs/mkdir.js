const fs = require('fs')

const dirName = './diretorio'

if(!fs.existsSync(dirName)){
    fs.mkdirSync(dirName)
    console.log('Diretório criado.')
} else {
    console.log('Diretório existente.')
}