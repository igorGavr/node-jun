const {User} = require("../dataBase");

module.exports = {
    findUsers: (params = {}) => {
        return User.find(params)
    },

    findOneUser: (params = {}) => {
        return User.findOne(params)  // звертаємося до нашої бази юзерів
        // і шукаємо нашого юзера по params(email)
    },

    createUser: (user) => {
        return User.create(user)
    },
    updateOneUser: (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },
    deleteOneUser: (params) => {
        return User.deleteOne(params)
    },
}
