const Joi = require('joi');

module.exports = {
    portfolio: Joi.object({
      projectCategory: Joi.string().empty().required().messages({
        'any.required': 'Project category is required.',
        'string.empty': 'Project category cannot be empty.',
      }),
      projectName: Joi.string().empty().required().messages({
        'any.required': 'Project name is required.',
        'string.empty': 'Project name cannot be empty.',
      }),
      projectTitle: Joi.string().empty().required().messages({
        'any.required': 'Project title is required.',
        'string.empty': 'Project title cannot be empty.',
      }),
      projectDate: Joi.string().empty().required().messages({
        'any.required': 'Project date is required.',
        'date.iso': 'Invalid project date format. Use ISO date format.',
      }),
      description:Joi.string().empty().required().messages({
        'any.required': 'Description is required.',
        'string.empty': 'Description cannot be empty.',
      }),
      categoryId: Joi.number().empty().required().messages({
        'any.required': 'Category ID is required.',
        'number.base': 'Category ID must be a number.',
      }),
    }),
    updatePortfolio: Joi.object({
        projectCategory: Joi.string().empty().messages({
          'any.required': 'Project category is required.',
          'string.empty': 'Project category cannot be empty.',
        }),
        projectName: Joi.string().empty().messages({
          'any.required': 'Project name is required.',
          'string.empty': 'Project name cannot be empty.',
        }),
        projectTitle: Joi.string().empty().messages({
          'any.required': 'Project title is required.',
          'string.empty': 'Project title cannot be empty.',
        }),
        projectDate: Joi.string().empty().messages({
          'any.required': 'Project date is required.',
          'date.iso': 'Invalid project date format. Use ISO date format.',
        }),
        description:Joi.string().empty().messages({
          'any.required': 'Description is required.',
          'string.empty': 'Description cannot be empty.',
        }),
        categoryId: Joi.number().empty().messages({
          'any.required': 'Category ID is required.',
          'number.base': 'Category ID must be a number.',
        }),
      }),
  };
  