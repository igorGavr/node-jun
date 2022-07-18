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

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const path = require("path");
// для динамічного підключення .env файлів
require('dotenv').config({
    path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});
// файли .env повинні бути обовязково вище  configs
const swaggerJson = require("./swagger.json")

const {authRouter, userRouter } = require("./routes");
const { configs } = require('./configs');


mongoose.connect(configs.MONGO_URL)   // підключаємося до бази данних

const app = express()    // створюємо апку(сервер)
app.use(express.json())  // вчу апку розпізнавати json

app.use('/auth', authRouter);  // підключаємо роутер який буде обробляти всі запити на /auth
app.use('/users', userRouter)  // підключаємо роутер який буде обробляти всі запити на /users

app.use('./docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))


app.use('*', (req, res) => {   // якщо шлях не знайдено то видаємо 404-тий статус
    res.status(404).json('Page not found (');
})
// сюди вилітають помилки з next(e)
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        })
})

app.listen(configs.PORT, () => {  // налаштовуємо порт який  будемо слухати
    console.log(`Started on port ${configs.PORT}`)
})
