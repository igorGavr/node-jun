const { passwordService, emailService} = require('../services');
const { generateAuthTokens } = require('../services/token.service');
const { OAuth } = require('../dataBase');
const {login} = require("../validators/auth.validator");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id } = req.user;
            const { password } = req.body;

            await emailService.sendEmail();

            // порівюємо Хеш-пароль та звичайний пароль
            await passwordService.comparePassword(hashPassword, password);
            // якщо паролі збігаються то генеруємо access та refresh токени за допомогою бібліотеки jsonwebtoken
            const tokens = generateAuthTokens();
            // console.log(tokens.access_token, tokens.refresh_token)

            await OAuth.create({ // створюємо в табличці OAuth запис про нашого
                // юзера який містить Айдішку та пару токенів
                userId: _id,
                ...tokens
            })

            res.json({  // передаємо юзера та пару токенів
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            // витягуємо refresh токен, видаляємо з таблички поточний токен,
            // генеруємо нову пару токенів та записуємо в табличку
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token})

            const tokens = generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { access_token } = req;

            await OAuth.deleteOne({ access_token })

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },


    logoutAllDevices: async (req, res, next) => {
    try {
        const { _id } = req.user;  // з усієї інфи юзера витягуємо Айдішку

        await OAuth.deleteMany({ userId: _id }) // видаляємо всі поля котрі мають таку Айдішку

        res.sendStatus(204);
    } catch (e) {
        next(e)
    }
},
};
