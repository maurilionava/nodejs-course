const express = require('express') //#1 express import
const { engine } = require('express-handlebars') //#1 exphbs import
const conn = require('./db/conn')

//MODELS IMPORT
const Task = require('./models/Task')

//ROUTER IMPORT
const taskRoutes = require('./routes/tasksRouter')

const port = 3000 //#2 express: define a port

const app = express() //#3 express:

//#2 exphbs: setting handlebars configuration
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
// app.set('views', './views');

//+express: to use json in response
//+express: middleware para ler o corpo da requisição
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json()) //+express: leitura de json
app.use(express.static('public')) //+express: defining the statics folder

//#4 express: define a route
// app.get('/', (req, res, next) => { 
//     res.render('home')
// })
app.use('/tasks', taskRoutes)

//#5 express: starts the server
// app.listen(port, () => { 
//     console.log(`Server running on http://localhost:${port}`)
// })

//Sync with database
conn
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port }`)
        })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })