const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TasksController')

router.get('/toggleStatus/:id', TaskController.toggleStatus)
router.get('/remove/:id', TaskController.removeTask)
router.post('/save', TaskController.saveTask)
router.get('/add/:id', TaskController.addTask)
router.get('/add', TaskController.addTask)
router.get('/', TaskController.showTasks)

module.exports = router