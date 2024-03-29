const express = require('express');
const router = express.Router();
const controller = require('../controller/contactController');
const validate = require('../validation/contactValidation');
const { validator } = require('../middleware/validator');
const { errorHandler } = require('../helper/error');
const { authentication } = require('../middleware/authenticate');

router.post(
  '/addContact',
  authentication,
  validator.body(validate.contact),
  errorHandler(controller.addContact),
);
router.get('/viewContact/:id', authentication, controller.viewContact);
router.put(
  '/updateContact/:id',
  authentication,
  validator.body(validate.updateContact),
  errorHandler(controller.updateContact),
);
router.delete('/deleteContact/:id', authentication, controller.deleteContact);
router.delete(
  '/deleteMultipleContact',
  authentication,
  errorHandler(controller.deleteMultipleContact),
);
module.exports = router;
