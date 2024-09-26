const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/users/edit', async (req,res)=>{
    const id = req.body.id

    const user = await User.findOne({ include: Address, where: {id: id} })
    
    res.render('user-form', { user: user.get({ plain: true }) })
})

app.post('/users/remove', async (req,res)=>{
    const id = req.body.id
    
    // await Address.destroy({ where: {UserId: id} })
    await User.destroy({ where: {id: id} })

    res.redirect('/users')
})

app.get('/users/add', (req,res) => {
    res.render('user-form')
})

app.post('/users/save', async (req,res) => {
    //user
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter === 'on' ? true : false
    //user address
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    if(id > 0){
        await User.update({id, name, occupation, newsletter}, {where: {id:id}})
        await Address.update({street, number, city}, {where: {UserId: id}})
    } else{
        const createdUser = await User.create({name, occupation, newsletter})
        const createdUserId = createdUser.id
        await Address.create({street, number, city, UserId: createdUserId})
    }

    res.redirect('/users')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ include: Address, where: {id: id}})

    res.render('userview', { user: user.get({plain: true}) })
})

app.get('/users', async (req, res) => {
    const users = await User.findAll({include: Address})
    const jsonUsers = users.map((r) => r.toJSON())

    res.render('users', {users: jsonUsers})
})

app.get('/', (req, res) => {
    res.render('home')
})

conn
    // .sync({ force: true })
    .sync() //sincronizar a criação das tabelas a partir dos models
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {console.log(err)})
