const {Types} = require("mongoose");

const {CustomError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { id } = req.params; // дістаємо айді з парамсів

            //перевіряємо на валідність айдішку
            if (!Types.ObjectId.isValid(id)) {
                return next(new CustomError('Not valid ID'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
