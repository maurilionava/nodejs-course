const x = 10

if(!Number.isInteger(x)){
    throw new Error(`A variável ${x} não é do tipo número`)
}

try{
    x = 1
} catch(err) {
    console.log(`Erro: ${err}`)
}