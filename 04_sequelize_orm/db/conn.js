const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sequelize_orm', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

// try{
//     sequelize.authenticate()
// } catch(err) {
//     console.log(err)
// }

module.exports = sequelize