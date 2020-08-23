const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  status: Joi.string().error(new Error(errorMessages.SUBMISSION_STATUS)),
  assigned_level: Joi.number().error(new Error(errorMessages.ASSIGN_LEVEL))
});

exports.update = Joi.object().keys({
  statue: Joi.string()
    .error(new Error(errorMessages.SUBMISSION_STATUS))
    .optional(),
  assigned_level: Joi.number()
    .error(new Error(errorMessages.ASSIGN_LEVEL))
    .optional()
});
