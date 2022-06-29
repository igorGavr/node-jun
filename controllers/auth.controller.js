const { passwordService, emailService} = require('../services');
const { generateAuthTokens } = require('../services/token.service');
const { OAuth } = require('../dataBase');
const { login } = require("../validators/auth.validator");
const { emailActionTypeEnum } = require('../enums')

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id } = req.user;
            const { password } = req.body;


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
            const { access_token, user } = req;
            const { email, name } = user

            await OAuth.deleteOne({ access_token })

            await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, { name, count: 1 })

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },


    logoutAllDevices: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;  // з усієї інфи юзера витягуємо Айдішку
    
            const { deletedCount } = await OAuth.deleteMany({ userId: _id }) // видаляємо всі поля котрі мають таку Айдішку
            // нам повертається кількість пристроїв яких ми розлогінили

            await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, { name, count: deletedCount })
            
            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    
    forgotPassword: async (req, res, next) => {
        try {
            const { email, name } = req.user

            await emailService.sendMail(email, emailActionTypeEnum.FORGOT_PASSWORD, { name })

            res.sendStatus(204)
        }catch (e) {
            next(e)
        }
    }
};
