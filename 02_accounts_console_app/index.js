// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
    .then((answer) => {
        const action = answer['action']

        if(action === 'Criar conta'){
            createAccount()
        } else if(action === 'Consultar saldo'){
            getAccountBalance()
        } else if(action === 'Depositar'){
            deposit()
        } else if(action === 'Sacar'){
            withdraw()
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
            process.exit()
        }
    })
    .catch((err) => console.log(err))
}

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para a sua conta: '
    }])
    .then((answer)=>{
        const accountName = answer['accountName']
        const accountsDir = './accounts'

        if(!fs.existsSync(accountsDir)){
            fs.mkdirSync(accountsDir)
        }

        if(fs.existsSync(`${accountsDir}/${accountName}.json`)){
            console.log(chalk.bgRed.white('Conta já existente'))
            buildAccount()
            return
        } else {
            fs.writeFileSync(`${accountsDir}/${accountName}.json`, '{"balance":0}', (err) => {
                console.log(err)
            })
        }

        console.log(chalk.bgGreen('Conta criada com sucesso'))
    })
    .catch((err) => console.log(err))
}

function deposit(){
    inquirer.prompt([{
        name: 'accountName' ,
        message: 'Informe o nome da conta'
    }])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!existsAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Informe o valor a ser depositado'
        }])
        .then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function existsAccount(accountName){
    const accountsDir = './accounts'
    if(!fs.existsSync(`${accountsDir}/${accountName}.json`)){
        console.log(chalk.bgRed('Conta inexistente'))
        return false
    }

    return true
}

function addAmount(accountName, amount){
    const accountsDir = './accounts'
    if(!amount){
        console.log(chalk.bgRed('Valor inválido'))
        return deposit()
    }

    const accountData = getAccount(accountName)

    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

    fs.writeFileSync(`${accountsDir}/${accountName}.json`, 
        JSON.stringify(accountData),
        (err) => console.log(err))

    console.log(chalk.green(`Depósito no valor de R$${amount} realizado com sucesso`))
}

function getAccount(accountName){
    const accountsDir = './accounts'
    const accountJson = fs.readFileSync(`${accountsDir}/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}

function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: '
    }])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!existsAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`O saldo da conta é de R$${accountData.balance}`))
    })
}

function withdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Informe o nome da conta: '
    }])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!existsAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Informe valor a ser sacado: '
        }])
        .then((answer) =>{
            const accountsDir = './accounts'
            const amount = answer['amount']

            if(!amount){
                console.log(chalk.bgRed('Valor inválido'))
                return withdraw()
            }

            const accountData = getAccount(accountName)
            
            if(parseFloat(accountData.balance) >= parseFloat(amount)){
                accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
                            
                fs.writeFileSync(`${accountsDir}/${accountName}.json`, 
                    JSON.stringify(accountData),
                    (err) => console.log(err))
            
                console.log(chalk.green(`Saque no valor de R$${amount} realizado com sucesso`))
            } else {
                console.log(chalk.red('Saldo insuficiente'))
                return withdraw()
            }
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

operation()