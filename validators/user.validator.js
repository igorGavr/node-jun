const Joi = require('joi')

const {emailValidator, passwordValidator, nameValidator, ageValidator} = require('./common.validator')

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator
    })
}
