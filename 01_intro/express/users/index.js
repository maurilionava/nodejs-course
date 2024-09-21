const express = require('express') // importar módulo
const router = express.Router()
const path = require('path')

const baseDirectory = path.join(__dirname, '../templates')

// tratamento de rotas
router.get('/add', (req, res) => {
    res.sendFile(`${baseDirectory}/userForm.html`)
})

router.post('/save', (req, res) => {
    const name = req.body.name
    const email = req.body.email

    console.log(`Nome: ${name} Email: ${email}`)
    res.sendFile(`${baseDirectory}/userForm.html`)
})

{/* URL Parameters */}
router.get('/:id', (req, res) => {
    const userId = req.params.id

    console.log(`User ID: ${userId}`)
    res.send(`User ID ${userId}`)
})

module.exports = router