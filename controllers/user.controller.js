const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");

module.exports = {
    allUsers: async (req, res, next) => {
        try{
            // шукаємо всіх юзерів та приводимо монго-обєкт в звичайний масив за допомогою .exec()
            const users = await userService.findUsers(req.query).exec()
            // мапаємо масив та приводимо його до нашого шаблону для виводу інфи
            const usersForResponse = users.map(u => userPresenter(u))
            res.json(usersForResponse)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try{
            // хешуємо пароль
            const hash = await passwordService.hashPassword(req.body.password)

            // записуємо нового юзера в табл. User перетираючи пароль захешованим паролем
            const newUser = await userService.createUser({...req.body, password: hash})
            // віддаємо нового юзера згідно шаблону
            const userForResponse = userPresenter(newUser)
            res.status(201).json(userForResponse)
        }catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try{
            const {user} = req

            const userForResponse = userPresenter(user)
            res.json(userForResponse)
        }catch (e) {
            next(e)
        }
    },

    updateUserById: async (req, res, next) => {
        try{
            const { id } = req.params;  // оновлюємо дані юзера по айдішці
            const updatedUser = await userService.updateOneUser({ _id: id }, req.body);
            const userForResponse = userPresenter(updatedUser)
            res.status(201).json(userForResponse);
        }catch (e) {
            next(e)
        }
    },

    deleteUserById: async (req, res, next) => {
        try{
            const { id } = req.params;
            await userService.deleteOneUser({ _id: id})
            res.sendStatus(204)
        }catch (e) {
            next(e)
        }
    }
}
