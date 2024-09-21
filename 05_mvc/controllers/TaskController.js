//importar entidade model
const Task = require('../models/Task')

//exportar task controller
module.exports = class TaskController {
    //criar tratamento rota de ciração de task
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static showTasks(req, res) {
        res.render('tasks/all')
    }
}