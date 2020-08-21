const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.updateProfile = Joi.object().keys({
  first_name: Joi.string()
    .min(3)
    .max(15)
    .error(new Error(errorMessages.FIRST_NAME)),
  last_name: Joi.string()
    .min(1)
    .max(15)
    .error(new Error(errorMessages.LAST_NAME)),
  avatar_image_url: Joi.string()
    .min(1)
    .error(new Error(errorMessages.PROFILE_IMAGE_URL)),
  linkedIn_url: Joi.string()
    .min(1)
    .error(new Error(errorMessages.LINKED_IN_URL)),
  address: Joi.object().error(new Error(errorMessages.ADDRESS)),
  primary_phone: Joi.string()
    .min(1)
    .error(new Error(errorMessages.PRIMARY_PHONE)),
  secondary_phone: Joi.string()
    .min(1)
    .error(new Error(errorMessages.SECONDARY_PHONE)),
  gender: Joi.string()
    .valid("male", "female")
    .error(new Error(errorMessages.GENDER)),
  personal_website: Joi.string()
    .min(1)
    .error(new Error(errorMessages.PERSONAL_WEBSITE)),
  profile_title: Joi.string()
    .min(1)
    .error(new Error(errorMessages.PROFILE_TITLE)),
  interested_languages: Joi.array()
    .items(Joi.string())
    .min(1)
    .error(new Error(errorMessages.INTERESTED_LANGUAGE)),
  profile_description: Joi.string()
    .min(1)
    .error(new Error(errorMessages.PROFILE_DESCRIPTION))
});

exports.create = Joi.object().keys({
  class_code: Joi.string()
    .error(new Error(errorMessages.CLASS_CODE_INVALID))
    .optional(),
  email: Joi.string()
    .email()
    .error(new Error(errorMessages.EMAIL_INVALID))
    .optional(),
  username: Joi.string()
    .error(new Error(errorMessages.USERNAME))
    .optional(),
  role: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .required(),
  first_name: Joi.string()
    .error(new Error(errorMessages.FIRST_NAME))
    .required(),
  last_name: Joi.string()
    .error(new Error(errorMessages.LAST_NAME))
    .required(),
  password: Joi.string()
    .error(new Error(errorMessages.PASSWORD))
    .required()
});

exports.update = Joi.object().keys({
  class_code: Joi.string()
    .error(new Error(errorMessages.CLASS_CODE_INVALID))
    .optional(),
  email: Joi.string()
    .email()
    .error(new Error(errorMessages.EMAIL_INVALID))
    .optional(),
  username: Joi.string()
    .error(new Error(errorMessages.USERNAME))
    .optional(),
  role: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .optional(),
  first_name: Joi.string()
    .error(new Error(errorMessages.FIRST_NAME))
    .optional(),
  last_name: Joi.string()
    .error(new Error(errorMessages.LAST_NAME))
    .optional(),
  password: Joi.string()
    .error(new Error(errorMessages.PASSWORD))
    .optional(),
  level: Joi.string()
    .error(new Error(errorMessages.LEVEL))
    .optional()
});

exports.userCheck = Joi.object().keys({
  role: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .optional(),
  first_name: Joi.string()
    .error(new Error(errorMessages.FIRST_NAME))
    .required(),
  last_name: Joi.string()
    .error(new Error(errorMessages.LAST_NAME))
    .required(),
  username: Joi.string()
    .error(new Error(errorMessages.USERNAME))
    .optional(),
  password: Joi.string()
    .error(new Error(errorMessages.PASSWORD))
    .optional()
});
