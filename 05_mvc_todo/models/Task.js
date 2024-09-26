const { DataTypes } = require('sequelize'); // Import the built-in data types

const db = require('../db/conn')

//Create database schema
const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        required: true
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        required: true
    }
})

module.exports = Task