//To connect to the database, you must create a Sequelize instance
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('mvc_todo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

//Testing the connection
// async () => {
//     try{
//         await sequelize.authenticate()
//         console.log('Connection has been established successfully.');
//     } catch(error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

//Sequelize will keep the connection open by default, and use the same connection for all queries
// sequelize.clise()

module.exports = sequelize
