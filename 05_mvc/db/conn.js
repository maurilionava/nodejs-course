const { Sequelize } = require('sequelize')

//realizar nova conexão instanciando um novo objeto
const sequelize = new Sequelize('nodemvc', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log(`Successfully connected to database`)
}catch(error){
    console.log(`Connection error: ${error}`)
}

module.exports = sequelize