const {userService} = require("../services");

module.exports = {
    allUsers: async (req, res, next) => {
        try{
            const users = await userService.findUsers()
            res.json(users)  // -----
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try{
            const newUser = await userService.createUser(req.body)
            res.status(201).json(newUser)
        }catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try{
            const {user} = req
            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUserById: async (req, res) => {
        try{
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
            console.log(updatedUser)
            users.splice(index, 1)
            await fileService.writer([...users, updatedUser])
            res.status(201).json(updatedUser)   // -------
        }catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    },

    deleteUserById: async (req, res) => {
        try{
            const {userId} = req.params
            const users = await fileService.reader()
            const index = users.findIndex((user) => user.id === +userId)
            if (index === -1){
                return res.status(400).json(`User with id ${userId} is not found`)
            }
            users.splice(index, 1)
            await fileService.writer(users)
            res.sendStatus(204)  // -----
        }catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    }
}
