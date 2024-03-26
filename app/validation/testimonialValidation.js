const Joi = require('joi');

module.exports = {
  testimonial: Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      'string.base': 'Testimonial Name must be a string',
      'string.empty': 'Testimonial Name cannot be an empty field',
      'string.min': 'Testimonial Name should have a minimum length of 3',
      'string.max': 'Testimonial Name should have a maximum length of 255',
      'any.required': 'Testimonial Name is required',
    }),
    designation: Joi.string().min(3).max(255).required().messages({
      'string.base': 'Designation must be a string',
      'string.empty': 'Designation cannot be an empty field',
      'string.min': 'Designation should have a minimum length of 3',
      'string.max': 'Designation should have a maximum length of 255',
      'any.required': 'Designation is required',
    }),
    description: Joi.string().min(3).max(1024).required().messages({
      'string.base': 'Testimonial Description must be a string',
      'string.empty': 'Testimonial Description cannot be an empty field',
      'string.min': 'Testimonial Description should have a minimum length of 3',
      'string.max':
        'Testimonial Description should have a maximum length of255',
      'any.required': 'Testimonial Description is required',
    }),
  }),
  updateTestimonial: Joi.object({
    name: Joi.string().min(3).max(255).messages({
      'string.base': 'Testimonial Name must be a string',
      'string.empty': 'Testimonial Name cannot be an empty field',
      'string.min': 'Testimonial Name should have a minimum length of 3',
      'string.max': 'Testimonial Name should have a maximum length of 255',
    }),
    designation: Joi.string().min(3).max(255).messages({
      'string.base': 'Designation must be a string',
      'string.empty': 'Designation cannot be an empty field',
      'string.min': 'Designation should have a minimum length of 3',
      'string.max': 'Designation should have a maximum length of 255',
    }),
    description: Joi.string().min(3).max(1024).messages({
      'string.base': 'Testimonial Description must be a string',
      'string.empty': 'Testimonial Description cannot be an empty field',
      'string.min': 'Testimonial Description should have a minimum length of 3',
      'string.max':
        'Testimonial Description should have a maximum length of255',
    }),
  }),
};
