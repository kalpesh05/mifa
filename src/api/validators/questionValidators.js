const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  question: Joi.any().error(new Error(errorMessages.QUESTION_INVALID)),
  level_id: Joi.number()
    .min(1)
    .error(new Error(errorMessages.LEVEL)),
  correct_answer: Joi.number().error(new Error(errorMessages.CORRECT_ANSWER))
});

exports.update = Joi.object().keys({
  question: Joi.any()
    .error(new Error(errorMessages.QUESTION_INVALID))
    .optional(),
  level_id: Joi.string()
    .min(1)
    .error(new Error(errorMessages.LEVEL))
    .optional(),
  correct_answer: Joi.number()
    .error(new Error(errorMessages.CORRECT_ANSWER))
    .optional()
});
