const Task = require('../models/Task')

//Another method to export a module
module.exports = class TaskController {
    
    static async toggleStatus(req, res) {
        const id = req.params.id
        const task = await Task.findOne({raw: true, where: {id: id}})

        task.isDone = task.isDone == 0 ? 1 : 0
        
        await Task.update({isDone: task.isDone}, {where: {id: id}})

        res.redirect('/tasks')
    }

    static async removeTask(req, res) {
        const id = req.params.id

        await Task.destroy({where: {id: id}})

        res.redirect('/tasks')
    }

    static async saveTask(req, res) {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
        let isDone = false
        
        //TODO: validations
        //TODO: data processing

        if(id > 0){
            isDone = req.body.isDone == 'on' ? true : false
            console.log('isDone edited:',isDone)
            await Task.update({title, description, isDone}, {where: {id: id}})
        } 
        else {
            await Task.create({title, description, isDone})
        }

        res.redirect('/tasks')
    }

    static async addTask(req, res) {
        const id = req.params.id

        if(id > 0){
            const task = await Task.findOne({raw: true, where: {id: id}})
            console.log(task)
            res.render('tasks/add', {task})
        } 
        else {
            res.render('tasks/add')
        }
    }
    
    static async showTasks(req, res) {
        const tasks = await Task.findAll({ raw: true })

        res.render('tasks/all', { tasks })
    }
}