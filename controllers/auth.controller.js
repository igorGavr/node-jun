const { passwordService, emailService} = require('../services');
const { generateAuthTokens, generateActionToken} = require('../services/token.service');
const { OAuth, ActionTokens, User} = require('../dataBase');
const { login } = require("../validators/auth.validator");
const { WELCOME, FORGOT_PASSWORD } = require('../configs/email-action.enum')

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id, name, email } = req.user;
            const { password } = req.body;

            // посилаємо емейл на адресу                 кому ,       назва темплейту,    зміні які є в темплейті
            await emailService.sendMail(email, WELCOME, {userName: name}); // TEST CODE
            // await emailService.sendMail(email, WELCOME); // REAL CODE


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

    forgotPassword: async (req, res, next) => {
        try {
            const { _id, name, email } = req.user;
            // генеруємо ActionToken
            const token = generateActionToken(FORGOT_PASSWORD, {name, _id})
            // записуємо в табл. ActionTokens
            await ActionTokens.create({
                userId: _id,
                token,
                actionType: FORGOT_PASSWORD
            })

            // посилаємо емейл на адресу
            // на пошті в листі клікнули на кнопку Відновити Пароль
            // нас перекинуло на фронтенд де ми ввели новий пароль ,
            // фронт посилає нам токен(привязаний в Хедерах)
            // та новий пароль на урлу /password/forgot/set
            await emailService.sendMail(email,
                FORGOT_PASSWORD, {userName: name, token}); // TEST CODE

            res.json('Ok');
        } catch (e) {
            next(e)
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const updatedUser = await User
                .findByIdAndUpdate(_id, { password: hashPassword }, {new: true});

            await ActionTokens.deleteOne({actionType: FORGOT_PASSWORD, userId: _id})

            res.json(updatedUser)
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
