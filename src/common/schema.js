const Joi = require('joi');

const loginSchema = Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().require()
});

const Validate = function (input, schema) {
    const { error } = Joi.validate(input, schema);
    return error;
}

module.exports = {
    Validate,
    loginSchema
};