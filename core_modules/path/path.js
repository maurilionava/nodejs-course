const path = require('path')

const customPath = '/relatorios/johndoe/relatorio.pdf'

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))

console.log(path.resolve('arquivo.txt'))

const midFolder = 'relatorios'
const fileName = 'arquivo.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)
console.log(finalPath)