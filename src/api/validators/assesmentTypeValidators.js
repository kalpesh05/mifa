const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  title: Joi.string().error(new Error(errorMessages.TITLE_INVALID)),
  assesment_type_index: Joi.number().error(new Error(errorMessages.INDEX))
});

exports.update = Joi.object().keys({
  title: Joi.string()
    .error(new Error(errorMessages.TITLE_INVALID))
    .optional(),
  assesment_type_index: Joi.number()
    .error(new Error(errorMessages.INDEX))
    .optional()
});
