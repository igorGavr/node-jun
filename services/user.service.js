const {User} = require("../dataBase");

module.exports = {
    findUsersWithPagination: async (query= {}) => {
        const { page = 1, perPage = 5, ...otherFilters } = query;

        console.log(otherFilters);

        const filterQuery = _getUserFilterQuery(otherFilters);

        const skip = (page - 1) * perPage; // 0

        const users = await User.find(filterQuery).skip(skip).limit(perPage);
        const usersCount = await User.countDocuments(filterQuery);

        return {
            page,
            perPage,
            data: users,
            count: usersCount
        }
    },

    findOneUser: (params = {}) => {
        return User.findOne(params)  // звертаємося до нашої бази юзерів
        // і шукаємо нашого юзера по params(email)
    },

    createUser: (user) => {
        return User.create(user)
    },
    // options = {new: true} - дозволяє повертати оновлені дані
    updateOneUser: (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },
    deleteOneUser: (params) => {
        return User.deleteOne(params)
    },
}

function _getUserFilterQuery(otherFilters) {
    const searchObject = {};

    if (otherFilters.search) {
        Object.assign(searchObject, {
            $or: [
                { name: { $regex: otherFilters.search, $options: 'i' }},
                { email: { $regex: otherFilters.search, $options: 'i' }}
            ]
        })
    }

    if (otherFilters.ageGte) {
        Object.assign(searchObject, {
            age: { $gte: +otherFilters.ageGte }
        })
    }

    if (otherFilters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: +otherFilters.ageLte
            }
        })
    }

    console.log(JSON.stringify(searchObject, null ,2));

    return otherFilters
}
