// $npm init 
// $npm install minimist
// $node .\07_npm._minimist.js --nome=maurilio
// $node .\07_npm._minimist.js --nome=maurilio --profissao=bombeiro
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
console.log(args)

const nome = args['nome']
console.log(nome)