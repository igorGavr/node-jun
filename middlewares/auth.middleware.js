const { checkAccessToken, checkToken} = require("../services/token.service");
const { OAuth } = require("../dataBase");
const { CustomError } = require('../errors');
const { userService } = require('../services');
const { authValidator } = require("../validators");
const { tokenTypeEnum } = require("../enums");
const { constants } = require("../configs");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(access_token);

            const tokenInfo = await OAuth
                .findOne({ access_token })
                .populate('userId');
            console.log(tokenInfo)

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({ email });

            if (!user) {
                return next(new CustomError('Wrong email or password'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                return next(new CustomError('No token', 401));
            }
            console.log(refresh_token)
            checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth
                .findOne({ refresh_token });

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },


    isLoginBodyValid: async (req, res, next) => {
        try {

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
