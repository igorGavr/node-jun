
const express = require('express')
const users = require('./dataBase/users')
const app = express()

app.get('/', function (req, res) {
    console.log(req)

    res.json('hello')
})
app.get('/users', (req, res) => {
    res.json(users)
})
app.get('/users/:userId', (req, res) => {
    const userIndex = +req.params.userId;
    if (userIndex < 0) {
        res.status(400).json('Please enter valid ID')
        return
    }
    const user = users[userIndex]
    if (!user) {
        res.status(400).json(`User with ID ${userIndex} is not found`)
        return
    }
    res.json(user)
})

app.listen(5000, () => {
    console.log('server 5000')
})
