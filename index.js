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
const mongoose = require('mongoose')

const {authRouter, userRouter } = require("./routes");
const { configs } = require('./configs');

mongoose.connect(configs.MONGO_URL)

const app = express()
app.use(express.json())  // вчу апку розпізнавати json

app.use('/auth', authRouter);
app.use('/users', userRouter)

app.use('*', (req, res) => {
    res.status(404).json('Page not found (');
})
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        })
})

app.listen(configs.PORT, () => {
    console.log(`Started on port ${configs.PORT}`)
})
