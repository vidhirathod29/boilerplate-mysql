const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const controller = require('../controller/authController');
const validate = require('../validation/authValidation');
const { validator } = require('../middleware/validator');
const { authentication } = require('../middleware/authenticate');
const { errorHandler } = require('../helper/error');

router.post(
  '/registration',
  upload.single('image'),
  validator.body(validate.register),
  errorHandler(controller.registration),
);
router.post('/login', validator.body(validate.login), errorHandler(controller.login));
router.get('/viewProfile', authentication, errorHandler(controller.viewProfile));
router.put(
  '/updateProfile',
  upload.single('image'),
  authentication,
  validator.body(validate.update),
  errorHandler(controller.updateUserData),
);
router.put(
  '/resetPassword',
  authentication,
  validator.body(validate.resetPassword),
  errorHandler(controller.resetPassword),
);
router.post(
  '/verifyEmail',
  validator.body(validate.verifyEmail),
  errorHandler(controller.verifyEmail),
);

router.post(
  '/verifyOtp',
  validator.body(validate.verifyOtp),
  errorHandler(controller.verifyOtp),
);
router.put(
  '/updatePassword',
  validator.body(validate.updatePassword),
  errorHandler(controller.updatePassword),
);

module.exports = router;
