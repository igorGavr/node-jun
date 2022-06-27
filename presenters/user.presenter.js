module.exports = {
    userPresenter: (user) => {
        return {
            // шаблон для виводу інфи про юзера
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    },
};
