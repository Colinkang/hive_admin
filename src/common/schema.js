const Joi = require('joi');
const Validate = function (input, schema) {
    const { error } = Joi.validate(input, schema);
    return error;
}
const loginSchema = Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required()
});

const beeBoxAddSchema = Joi.object().keys({
    beeBoxNo: Joi.string().max(25).required(),
    farmerId: Joi.string().required(),
    manufacturer: Joi.string().required(),
    batchNo: Joi.string().required(),
    status: Joi.string().required(),
    entryDate: Joi.string().required(),
    mobile: Joi.string().required(),
    code: Joi.string().required(),
})

const beeFarmerAddSchema = Joi.object().keys({
    name: Joi.string().max(10).required(),
    organizationId: Joi.number().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    code: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
})

const organizeAddSchema = Joi.object().keys({
    organizationName: Joi.string().max(10).required(),
    contactName: Joi.string().max(10).required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required()
})


module.exports = {
    Validate,
    loginSchema,
    beeBoxAddSchema,
    beeFarmerAddSchema,
    organizeAddSchema
};