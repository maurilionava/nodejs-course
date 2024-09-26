//importar entidade model
const Task = require('../models/Task')

//exportar task controller
module.exports = class TaskController {
    //criar tratamento rota de ciração de task
    static createTask(req, res) {
        res.render('/tasks/create')
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        //validações
        //processamento de dados

        await Task.create(task)

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {
        const tasks = await Task.findAll({ raw: true })

        res.render('/tasks/all', { tasks })
    }

    static async removeTask(req, res) {
        const taskid = req.body.id
        // const task = Task.findByPk(taskid)

        // if(!task){
        //     console.log(`Task ID ${taskid} not found`)
        // } 

        await Task.destroy({where: {id:id}})

         res.redirect('/tasks')
    }
}