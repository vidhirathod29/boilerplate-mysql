const Joi = require('joi');

module.exports = {
  register: Joi.object().keys({
    firstName: Joi.string().empty().required().min(3).messages({
      'string.base': `First name should be type of 'string'`,
      'string.empty': `First name should not be empty`,
      'any.required': `First name is required`,
    }),
    lastName: Joi.string().empty().required().min(3).messages({
      'string.base': `Last name should be type of 'string'`,
      'string.empty': `Last name should not be empty`,
      'any.required': `Last name is required`,
    }),
    gender: Joi.string().empty().required().messages({
      'string.base': `Gender should be type of 'string'`,
      'string.empty': `Gender should not be empty`,
      'any.required': `Gender is required`,
    }),
    hobby: Joi.string().required().messages({
      'string.base': `Hobby should be type of 'string'`,
      'any.required': `Hobby is required`,
    }),
    city: Joi.string().empty().required().messages({
      'string.base': `City should be type of 'string'`,
      'string.empty': `City should not be empty`,
      'any.required': `City is required`,
    }),
    mobile: Joi.string().empty().required().messages({
      'string.base': `Mobile number should be type of 'number'`,
      'string.empty': `Mobile number should not be empty`,
      'any.required': `Mobile number is required`,
    }),
    email: Joi.string()
      .empty()
      .required()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
    password: Joi.string()
      .empty()
      .required()
      .min(8)
      .max(16)
      .pattern(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d).{8,})\S$/
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 8 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.pattern.base"': `Password must contain at least one uppercase alphabet, one lowercase alphabet`,
        'any.required': `password is required`,
      }),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .empty()
      .required()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
    password: Joi.string()
      .empty()
      .required()
      .min(8)
      .max(16)
      .pattern(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d).{8,})\S$/
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.pattern.base"': `Password must contain at least one uppercase alphabet, one lowercase alphabet `,
        'any.required': `password is required`,
      }),
  }),
  update: Joi.object().keys({
    firstName: Joi.string().empty().min(3).messages({
      'string.base': `First name should be type of 'string'`,
      'string.empty': `First name should not be empty`,
      'any.required': `First name is required`,
    }),
    lastName: Joi.string().empty().min(3).messages({
      'string.base': `Last name should be type of 'string'`,
      'string.empty': `Last name should not be empty`,
      'any.required': `Last name is required`,
    }),
    gender: Joi.string().empty().messages({
      'string.base': `Gender should be type of 'string'`,
      'string.empty': `Gender should not be empty`,
      'any.required': `Gender is required`,
    }),
    hobby: Joi.string().messages({
      'string.base': `Hobby should be type of 'string'`,
      'any.required': `Hobby is required`,
    }),
    city: Joi.string().empty().messages({
      'string.base': `City should be type of 'string'`,
      'string.empty': `City should not be empty`,
      'any.required': `City is required`,
    }),
    mobile: Joi.string().empty().messages({
      'string.base': `Mobile number should be type of 'number'`,
      'string.empty': `Mobile number should not be empty`,
      'any.required': `Mobile number is required`,
    }),
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
  }),
  resetPassword: Joi.object().keys({
    oldPassword: Joi.string()
      .empty()
      .required()
      .min(8)
      .max(16)
      .pattern(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d).{8,})\S$/
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 8 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.pattern.base"': `Password must contain at least one uppercase alphabet, one lowercase alphabet `,
        'any.required': `password is required`,
      }),
    newPassword: Joi.string()
      .empty()
      .required()
      .min(8)
      .max(16)
      .pattern(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d).{8,})\S$/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 8 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.pattern.base"': `Password must contain at least one uppercase alphabet, one lowercase alphabet `,
        'any.required': `password is required`,
      }),
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
  }),
  verifyEmail: Joi.object().keys({
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
  }),
  verifyOtp: Joi.object().keys({
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
    otp: Joi.string()
      .required()
      .length(6)
      .pattern(/^\d+$/)
      .messages({
        'string.base': 'OTP must be a string',
        'string.length': 'OTP must be 6 characters long',
        'string.pattern.base': 'OTP must contain only numbers',
        'any.required': 'OTP is required',
      }),
  }),
  updatePassword: Joi.object().keys({
    newPassword: Joi.string()
      .empty()
      .required()
      .min(8)
      .max(16)
      .pattern(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d).{6,})\S$/
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 8 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.pattern.base"': `Password must contain at least one uppercase alphabet, one lowercase alphabet`,
        'any.required': `password is required`,
      }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('newPassword'))
      .messages({
        'string.base': `Confirm password should be a type of 'text'.`,
        'any.only': `Confirm password doesn't match the password.`,
        'any.required': `Confirm password is a required field.`,
      }),
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
  }),
};
