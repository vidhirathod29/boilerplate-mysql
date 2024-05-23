const Joi = require('joi');

module.exports = {
  category: Joi.object({
    categoryName: Joi.string().min(2).max(255).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of 2',
      'string.max': 'Name should have a maximum length of 255',
      'any.required': 'Name is required',
    }),
    description: Joi.string().max(1024).messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be an empty field',
      'string.max': 'Description should have a maximum length of 1024',
    }),
  }),
  updateCategory: Joi.object({
    categoryName: Joi.string().min(2).max(255).messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of 2',
      'string.max': 'Name should have a maximum length of 255',
      'any.required': 'Name is required',
    }),
    description: Joi.string().max(1024).messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be an empty field',
      'string.max': 'Description should have a maximum length of 1024',
    }),
  }),
};
