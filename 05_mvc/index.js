const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

//ativar express
const app = express()

//importar conexão com sequelize
const conn = require('./db/conn')

const Task = require('./models/Task')

const taskRouter = require('./routes/taskRoutes')

//configurar template engine handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//middleware para mapeamento json
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRouter)

conn
    .sync()
    .then(() => {
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
    })
    .catch((err) => {
        console.log(err)
}) 