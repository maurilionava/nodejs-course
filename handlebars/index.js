const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/blog', (req,res) => {
    const posts = [{
        title: 'Tema 01',
        category: 'Categoria 01',
        body: 'Parágrafo referente ao tema 01 da categoria 01',
        comments: 4
    },
    {
        title: 'Tema 01',
        category: 'Categoria 01',
        body: 'Parágrafo referente ao tema 01 da categoria 01',
        comments: 4
    },
    {
        title: 'Tema 01',
        category: 'Categoria 01',
        body: 'Parágrafo referente ao tema 01 da categoria 01',
        comments: 4
    },
    {
        title: 'Tema 01',
        category: 'Categoria 01',
        body: 'Parágrafo referente ao tema 01 da categoria 01',
        comments: 4
    }]

    res.render('blog', {posts})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Tema 01',
        category: 'Categoria 01',
        body: 'Parágrafo referente ao tema 01 da categoria 01',
        comments: 4
    }

    res.render('blogpost', { post })
})

app.get('/dashboard', (req,res) => {
    res.render('dashboard')
})

app.get('/', (req, res) => {
    const user = {
        name: 'John Doe',
        age: 30
    }

    const palavra = "palavra-teste"

    const auth = false

    const nameList = ['John', 'Mary', 'Katy', 'Richard']

    res.render('home', {user: user, palavra, auth, nameList})
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})