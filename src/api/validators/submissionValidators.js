const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  type: Joi.string().error(new Error(errorMessages.SUBMISSION_TYPE)),
  assigned_level: Joi.number().error(new Error(errorMessages.ASSIGN_LEVEL))
});

exports.update = Joi.object().keys({
  type: Joi.string()
    .error(new Error(errorMessages.SUBMISSION_TYPE))
    .optional(),
  assigned_level: Joi.number()
    .error(new Error(errorMessages.ASSIGN_LEVEL))
    .optional()
});
