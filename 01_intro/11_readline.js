const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Qual sua linguagem preferida?', (language) => {
    if(language === 'python'){
        console.log('Python?! Muito bom')
    } else {
        console.log(`Minha linguagem preferida é ${language}`)
    }
    
    readline.close()
})