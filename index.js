// Express — это веб-инфраструктура маршрутизации и промежуточного
// программного обеспечения, которая сама по себе имеет минимальную
// функциональность: приложение Express — это, по сути, серия вызовов
// функций промежуточного программного обеспечения.
//
//Функции промежуточного ПО — это функции, которые имеют доступ к
// объекту запроса ( req), объекту ответа ( res) и следующей функции
// промежуточного ПО в цикле запроса-ответа приложения.
//
//Функция app.use() используется для монтирования указанных функций
// промежуточного программного обеспечения по указанному пути.
// В основном он используется для настройки промежуточного
// программного обеспечения для вашего приложения.
const express = require('express')
const {fileService} = require("./services");

const app = express()
app.use(express.json())  // вчу апку розпізнавати json

app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users)  // -----
})

app.post('/users', async (req, res) => {
    const {name, age} = req.body
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age')
    }
    if (!name || name.length < 3) {
        return res.status(400).json('Set valid name')
    }
    const users = await fileService.reader()  // отримуємо поточних Юзерів
    // формуємо нового Юзера
    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
    console.log(newUser)
    await fileService.writer([...users, newUser]) // передаємо в метод поточних Юзерів та Нового
    // Юзера в форматі _______
    res.status(201).json(newUser)   // -------
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()
    const user = users.find((user) => user.id === +userId)
    if (!user){
        return res.status(400).json(`User with id ${userId} is not found`)
    }
    res.json(user)  // -----
})

app.put('/users/:userId', async (req, res) => {
    const {name, age} = req.body
    const {userId} = req.params

    if (age && !Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age')
    }
    if (name && name.length < 3) {
        return res.status(400).json('Set valid name')
    }
    const users = await fileService.reader()  // отримуємо поточних Юзерів
    const index = users.findIndex((user) => user.id === +userId)
    if (index === -1) {
        return res.status(400).json(`User with Id ${userId} is not found`)
    }
    const updatedUser = Object.assign(users[index], req.body)
    // const updatedUser = {...users[index], ...req.body}
    users.splice(index, 1)
    await fileService.writer([...users, updatedUser])
    res.status(201).json(updatedUser)   // -------
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()
    const index = users.findIndex((user) => user.id === +userId)
    if (index === -1){
        return res.status(400).json(`User with id ${userId} is not found`)
    }
    users.splice(index, 1)
    await fileService.writer(users)
    res.sendStatus(204)  // -----
})

app.listen(5000, () => {
    console.log('port 5000')
})
