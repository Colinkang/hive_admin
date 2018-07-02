const Joi = require('joi');
const Validate = function (input, schema) {
    const { error } = Joi.validate(input, schema, { allowUnknown: true });
    return error;
}
const loginSchema = Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required()
});

const beeBoxAddSchema = Joi.object().keys({
    beeBoxNo: Joi.string().max(25).required(),
    farmerId: Joi.number().required(),
    manufacturer: Joi.string().required(),
    batchNo: Joi.string().required(),
    status: Joi.string().required(),
    entryDate: Joi.string().required(),
    mobile: Joi.string().required(),
    code: Joi.any(),
})

const beeFarmerAddSchema = Joi.object().keys({
    name: Joi.string().max(10).required(),
    organizationId: Joi.number().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    code: Joi.string().required(),
    password: Joi.any(),
    address: Joi.string().required(),
})

const organizeAddSchema = Joi.object().keys({
    organizationName: Joi.string().max(10).required(),
    adminId: Joi.any(),
    contactName: Joi.string().max(10).required(),
    email: Joi.string().required(),
    contactPhone: Joi.string().required(),
    address: Joi.string().required()
});


const changeCodeSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().required(),
    smsCode: Joi.string().required()
});

const updatePasswordSchema = Joi.object().keys({
    username: Joi.string().required(),
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().required(),
    smsCode: Joi.string().required()
});

const createRuleSchema = Joi.object().keys({
    ruleName: Joi.string().required(),
    groupId: Joi.number().required(),
    minThreshold: Joi.string().required(),
    maxThreshold: Joi.string().required(),
    ruleType: Joi.number().required(),
    notificationTarget: Joi.string().required(),
    notificationWay: Joi.string().required(),
    adminId: Joi.string().required(),
});
const createManagerSchema = Joi.object().keys({
    address: Joi.string().required(),
    code: Joi.any(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.any(),
    rights: Joi.any(),
    type: Joi.any(),
    id: Joi.any(),
    username: Joi.any()
});

const adminDetailSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    type: Joi.number().required(),
    address: Joi.string().allow(null),
    code: Joi.string().required()
});
module.exports = {
    Validate,
    loginSchema,
    beeBoxAddSchema,
    beeFarmerAddSchema,
    organizeAddSchema,
    changeCodeSchema,
    createRuleSchema,
    createManagerSchema,
    adminDetailSchema,
    updatePasswordSchema
};