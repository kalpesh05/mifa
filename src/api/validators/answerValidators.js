const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  submission_id: Joi.number()
    .error(new Error(errorMessages.SUBMISSION))
    .required(),
  question_id: Joi.number()
    .error(new Error(errorMessages.QUESTION))
    .required(),
  answer: Joi.any()
    .error(new Error(errorMessages.ANSWER))
    .required(),
  retry_count: Joi.number()
    .error(new Error(errorMessages.RERTY_COUNT))
    .required(),
  is_attempted: Joi.number()
    .error(new Error(errorMessages.IS_ATTEMPTED))
    .optional(),
  is_correct: Joi.number()
    .error(new Error(errorMessages.IS_CORRECT))
    .required(),
  time_taken_in_ms: Joi.number()
    .error(new Error(errorMessages.TIME_TAKEN_IN_MS))
    .required()
});

exports.update = Joi.object().keys({
  submission_id: Joi.number()
    .error(new Error(errorMessages.SUBMISSION))
    .optional(),
  question_id: Joi.number()
    .error(new Error(errorMessages.QUESTION))
    .optional(),
  answer: Joi.any()
    .error(new Error(errorMessages.ANSWER))
    .optional(),
  retry_count: Joi.number()
    .error(new Error(errorMessages.RERTY_COUNT))
    .optional(),
  is_attempted: Joi.number()
    .error(new Error(errorMessages.IS_ATTEMPTED))
    .optional(),
  is_correct: Joi.number()
    .error(new Error(errorMessages.IS_CORRECT))
    .optional(),
  time_taken_in_ms: Joi.number()
    .error(new Error(errorMessages.TIME_TAKEN_IN_MS))
    .optional()
});
