const express = require('express');
const router = express.Router();
const controller = require('../controller/testimonialController');
const validate = require('../validation/testimonialValidation');
const { validator } = require('../middleware/validator');
const { authentication } = require('../middleware/authenticate');
const upload = require('../middleware/multer');

router.post(
  '/addTestimonial',
  upload.single('image'),
  authentication,
  validator.body(validate.testimonial),
  controller.addTestimonial,
);
router.get('/viewTestimonial/:id', authentication, controller.viewTestimonial);
router.put(
  '/updateTestimonial/:id',
  upload.single('image'),
  authentication,
  validator.body(validate.updateTestimonial),
  controller.updateTestimonial,
);
router.delete(
  '/deleteTestimonial/:id',
  authentication,
  controller.deleteTestimonial,
);
router.delete(
  '/deleteMultipleTestimonial',
  authentication,
  controller.deleteMultipleTestimonial,
);
module.exports = router;
