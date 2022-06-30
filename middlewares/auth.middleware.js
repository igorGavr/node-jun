const { checkAccessToken, checkToken, checkActionToken} = require("../services/token.service");
const { OAuth, ActionTokens} = require("../dataBase");
const { CustomError } = require('../errors');
const { userService } = require('../services');
const { authValidator } = require("../validators");
const { tokenTypeEnum } = require("../enums");
const { constants } = require("../configs");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            // дістаємо access токен з Хедерів
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                return next(new CustomError('No token', 401));
            }
            // перевіряємо токен
            checkToken(access_token);

            const tokenInfo = await OAuth        // методом populate
                .findOne({ access_token })  // ми приєднюємо до таблички Oauth
                .populate('userId');        // інфу з таблички User по полю userId


            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token; // розширюємо req та передаємо access_token
            req.user = tokenInfo.userId;               // передаємо дані про юзера
            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) =>  async (req, res, next) => {
        try {
            const action_token = req.get('Authorization');

            if (!action_token) {
                throw new CustomError(`No token`, 401);
            }
            checkActionToken(action_token, actionType)

            const tokenInfo = await ActionTokens
                .findOne({ token: action_token })
                .populate('userId')
            if (!tokenInfo){
                throw new CustomError(`Token not valid`, 401)
            }
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body;
            // шукаємо нашого користувача по емейлу
            const user = await userService.findOneUser({ email });

            if (!user) {
                return next(new CustomError('Wrong email or password'));
            }

            req.user = user;  // передаємо дальше
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION); // витягуємо refresh токен

            if (!refresh_token) {
                return next(new CustomError('No token', 401));
            }
            // перевіряємо refresh_token
            checkToken(refresh_token, tokenTypeEnum.REFRESH);
            // шукаємо в базі в табличці OAuth інфу по refresh_token
            // tokenInfo має поля :_id, userId, access_token, refresh_token
            const tokenInfo = await OAuth
                .findOne({ refresh_token });
            console.log(`checkRefreshToken -${tokenInfo}`)
            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo; // передіємо інфу дальше
            next();
        } catch (e) {
            next(e);
        }
    },


    isLoginBodyValid: async (req, res, next) => {
        try {
            // робимо валідацію емейла та пароля
            const {error, value} = await authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email or password'));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
}
