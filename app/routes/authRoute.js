const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const controller = require('../controller/authController');
const validate = require('../validation/authValidation');
const { validator } = require('../middleware/validator');
const { authentication } = require('../middleware/authenticate');

router.post(
  '/registration',
  upload.single('image'),
  validator.body(validate.register),
  controller.registration,
);
router.post('/login', validator.body(validate.login), controller.login);
router.get('/viewProfile', authentication, controller.viewProfile);
router.put(
  '/updateProfile',
  upload.single('image'),
  authentication,
  validator.body(validate.update),
  controller.updateUserData,
);
router.put(
  '/resetPassword',
  authentication,
  validator.body(validate.resetPassword),
  controller.resetPassword,
);
router.post(
  '/verifyEmail',
  validator.body(validate.verifyEmail),
  controller.verifyEmail,
);

router.post(
  '/verifyOtp',
  validator.body(validate.verifyOtp),
  controller.verifyOtp,
);
router.put(
  '/updatePassword',
  validator.body(validate.updatePassword),
  controller.updatePassword,
);

module.exports = router;
