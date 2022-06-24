const Joi = require('joi')

const {emailValidator, nameValidator, ageValidator} = require('./common.validator')

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator
    })
}
