const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  submission_id: Joi.number().error(new Error(errorMessages.SUBMISSION)),
  question_id: Joi.number().error(new Error(errorMessages.QUESTION)),
  answer: Joi.number().error(new Error(errorMessages.ANSWER)),
  retry_count: Joi.number().error(new Error(errorMessages.RERTY_COUNT))
});

exports.update = Joi.object().keys({
  submission_id: Joi.number()
    .error(new Error(errorMessages.SUBMISSION))
    .optional(),
  question_id: Joi.number()
    .error(new Error(errorMessages.QUESTION))
    .optional(),
  answer: Joi.number()
    .error(new Error(errorMessages.ANSWER))
    .optional(),
  retry_count: Joi.number()
    .error(new Error(errorMessages.RERTY_COUNT))
    .optional()
});
