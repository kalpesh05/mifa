const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(15)
    .error(new Error(errorMessages.TITLE_INVALID)),
  index: Joi.number().error(new Error(errorMessages.INDEX)),
  levle_index: Joi.number().error(new Error(errorMessages.INDEX)),
  assesment_type_id: Joi.number()
    .min(1)
    .error(new Error(errorMessages.ASSESMENT_TYPE))
});

exports.update = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(15)
    .error(new Error(errorMessages.TITLE_INVALID))
    .optional(),
  index: Joi.number()
    .error(new Error(errorMessages.INDEX))
    .optional(),
  levle_index: Joi.number()
    .error(new Error(errorMessages.INDEX))
    .optional(),
  assesment_type_id: Joi.number()
    .min(1)
    .error(new Error(errorMessages.ASSESMENT_TYPE))
    .optional()
});
