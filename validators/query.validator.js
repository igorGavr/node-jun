const Joi = require('joi')

const {emailValidator, nameValidator, ageValidator, queryPageValidator,
    queryPerPageValidator} = require('./common.validator')

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
        page: queryPageValidator,
        perPage: queryPerPageValidator
    })
}
