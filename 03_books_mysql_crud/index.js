const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.post('/book/save', (req,res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty
    const description = req.body.description

    const sql = `INSERT INTO books(title, pageqty, description) VALUES("${title}", ${pageqty}, "${description}")`
    console.log(sql)
    conn.query(sql, (err) => {
        if(err){
            console.log(err)
        }
    })

    res.redirect('/books')
})

app.get('/book/form', (req,res) => {
    res.render('form')
})

app.get('/book/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err)
            return
        }

        res.render('book', { book: data[0] })
    })
})

app.get('/books', (req,res) => {
    const sql = `SELECT * FROM books`
    conn.query(sql, (err, data) => {
        if(err){
            console.log(err)
            return
        }

        console.log(data)
        res.render('books', {books: data})
    })
})

app.get('/', (req,res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

conn.connect((err) => {
    if(err){
        return console.log(err)
    }

    console.log('Conectado com sucesso ao banco de dados MySQL')

    app.listen(3000, () => {
        console.log('teste')
    })
})