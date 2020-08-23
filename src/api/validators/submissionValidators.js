const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  status: Joi.string().error(new Error(errorMessages.SUBMISSION_STATUS)),
  assigned_level_id: Joi.number()
    .error(new Error(errorMessages.ASSIGN_LEVEL))
    .optional(),
  assesment_type_id: Joi.number().error(
    new Error(errorMessages.ASSESSMENT_TYPE)
  )
});

exports.update = Joi.object().keys({
  status: Joi.string()
    .error(new Error(errorMessages.SUBMISSION_STATUS))
    .optional(),
  assigned_level_id: Joi.number()
    .error(new Error(errorMessages.ASSIGN_LEVEL))
    .optional(),
  assesment_type_id: Joi.number().error(
    new Error(errorMessages.ASSESSMENT_TYPE)
  )
});
