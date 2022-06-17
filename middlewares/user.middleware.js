const { CustomError } = require('../errors');
const { userService } = require('../services');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findOneUser({ _id: id });
            if (!user) {
                return next(new CustomError('User not found'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    // isUserUniq: async (req, res, next) => {
    //     try {
    //         const { email } = req.body;
    //
    //         const user = await userService.findOneUser({ email });
    //         if (user) {
    //             return next(new CustomError(`User with email ${email} is exist`, 409));
    //         }
    //
    //         req.user = user;
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const { name, email, age, password } = req.body;

            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'));
            }

            if (!name || name.length < 3) {
                return next(new CustomError('Set valid name'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Set valid email'));
            }

            if (!password || name.password < 8) {
                return next(new CustomError('Set valid password'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    // isUserValidForUpdate: async (req, res, next) => {
    //     try {
    //         const { name, age } = req.body;
    //
    //         if (age && !Number.isInteger(age) || age < 18) {
    //             return res.status(400).json('Set valid age');
    //         }
    //
    //         if (name && name.length < 3) {
    //             return res.status(400).json('Set valid name');
    //         }
    //
    //         req.dateForUpdate = { name, age };
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
};
