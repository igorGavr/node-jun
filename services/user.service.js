const {User} = require("../dataBase");

module.exports = {
    findUsers: (params = {}) => {
        return User.find(params)
    },

    findOneUser: (params = {}) => {
        return User.findOne(params)
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
