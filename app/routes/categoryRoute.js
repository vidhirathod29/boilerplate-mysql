const express = require('express');
const router = express.Router();
const controller = require('../controller/categoryController');
const validate = require('../validation/categoryValidation');
const { validator } = require('../middleware/validator');
const { authentication } = require('../middleware/authenticate');

router.post(
  '/addCategory',
  authentication,
  validator.body(validate.category),
  controller.addCategory,
);
router.get('/viewCategory/:id', authentication, controller.viewCategory);
router.put(
  '/updateCategory/:id',
  authentication,
  validator.body(validate.updateCategory),
  controller.updateCategory,
);
router.delete('/deleteCategory/:id', authentication, controller.deleteCategory);
router.delete(
  '/deleteMultipleCategory',
  authentication,
  controller.deleteMultipleCategory,
);

module.exports = router;
