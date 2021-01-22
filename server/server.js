const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const port = process.env.PORT || 8080

const app = express()

// midleware section
app.use(bodyParser.json({ limit: '1mb' }))

app.use((req, res, next) => {
  console.log(`${req.method} -> ${req.url} `)
  next()
})

// static res
app.use(express.static('public'))

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
  next()
})

// roots section
app.get('/', (req, res) => {
  res.send('Hello, I am ExpressJS server!')
})

app.get('/api/v01/some', (req, res) => res.send('this is SOME url on ExpressJS server!'))
app.get('/api/v01/some/:some', (req, res) => res.send(`this is SOME + ${req.params.some}`))

app.post('/api/v01/user/:id', (req, res) => {
  const user = {
    id: req.params.id,
    Name: req.body.userName,
    User: req.body.userRole,
    Salary: req.body.userSalary,
    Date: new Date()
  }
  res.json(user)
})

app.get('/api/v01/json', (req, res) => res.json({ key: 1 }))
app.get('/api/v01/json/:value', (req, res) => res.json({ key: `${req.params.value}` }))

// starting server

app.listen(port, () => {
  console.log(`-> ExpressJS server \'cooked'\ on port http://localhost:${port}/`)
})
