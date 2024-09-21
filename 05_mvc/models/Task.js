const {DataTypes} = require('sequelize')

//importar conexão
const db = require('../db/conn')

//definir schema
const Task = db.define('Task', {
    title:{
        type:DataTypes.STRING,
        required: true
    },
    description:{
        type:DataTypes.STRING,
        required: true
    },
    done:{
        type:DataTypes.BOOLEAN,
        required: true
    }
})

module.exports = Task