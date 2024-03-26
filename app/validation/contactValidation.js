const Joi = require('joi');

module.exports = {
  contact: Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of {#limit}',
      'string.max': 'Name should have a maximum length of {#limit}',
      'any.required': 'Name is required',
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
    message: Joi.string().trim().max(1000).required().messages({
      'string.base': 'Message must be a string',
      'string.empty': 'Message cannot be an empty field',
      'string.max': 'Message should have a maximum length of 1000 characters',
      'any.required': 'Message is required',
    }),
    number: Joi.string()
      .trim()
      .length(10)
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.base': 'Number must be a string',
        'string.empty': 'Number cannot be an empty field',
        'string.length': 'Number should have a length of 10',
        'string.pattern.base': 'Number must contain only digits',
        'any.required': 'Number is required',
      }),
    date: Joi.string()
      .trim()
      .required()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .messages({
        'string.base': 'Date must be a string',
        'string.empty': 'Date cannot be an empty field',
        'string.pattern.base': 'Date should be in the format YYYY-MM-DD',
        'any.required': 'Date is required',
      }),
  }),
  updateContact: Joi.object({
    name: Joi.string().trim().min(2).max(50).messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of {#limit}',
      'string.max': 'Name should have a maximum length of {#limit}',
    }),
    email: Joi.string()
      .empty()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.pattern.base"': `Email should be in proper formate`,
      }),
    message: Joi.string().trim().max(1000).messages({
      'string.base': 'Message must be a string',
      'string.empty': 'Message cannot be an empty field',
      'string.max': 'Message should have a maximum length of 1000 characters',
    }),
    number: Joi.string()
      .trim()
      .length(10)

      .pattern(/^\d+$/)
      .messages({
        'string.base': 'Number must be a string',
        'string.empty': 'Number cannot be an empty field',
        'string.length': 'Number should have a length of 10',
        'string.pattern.base': 'Number must contain only digits',
      }),
    date: Joi.string()
      .trim()

      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .messages({
        'string.base': 'Date must be a string',
        'string.empty': 'Date cannot be an empty field',
        'string.pattern.base': 'Date should be in the format YYYY-MM-DD',
      }),
  }),
};
