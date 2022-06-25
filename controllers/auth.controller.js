const { passwordService } = require('../services');
const { generateAuthTokens } = require('../services/token.service');
const { OAuth } = require('../dataBase');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id } = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token})

            const tokens = generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    }
};
