const express = require('express');
const router = express.Router();
const controller = require('../controller/categoryController');
const validate = require('../validation/categoryValidation');
const { validator } = require('../middleware/validator');
const { authentication } = require('../middleware/authenticate');
const { errorHandler } = require('../helper/error');

router.post(
  '/addCategory',
  authentication,
  validator.body(validate.category),
  errorHandler(controller.addCategory),
);
router.get('/viewCategory/:id', authentication, controller.viewCategory);
router.put(
  '/updateCategory/:id',
  authentication,
  validator.body(validate.updateCategory),
  errorHandler(controller.updateCategory),
);
router.delete('/deleteCategory/:id', authentication, controller.deleteCategory);
router.delete(
  '/deleteMultipleCategory',
  authentication,
  errorHandler(controller.deleteMultipleCategory),
);

module.exports = router;
