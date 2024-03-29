const express = require('express');
const router = express.Router();
const controller = require('../controller/portfolioController');
const validate = require('../validation/portfolioValidation');
const { validator } = require('../middleware/validator');
const upload = require('../middleware/multer');
const { authentication } = require('../middleware/authenticate');
const { errorHandler } = require('../helper/error');

router.post(
  '/addPortfolio',
  authentication,
  upload.array('images', 5),
  validator.body(validate.portfolio),
  errorHandler(controller.addPortfolio),
);
router.get(
  '/viewPortfolio/:id',
  authentication,
  errorHandler(controller.viewPortfolio),
);
router.put(
  '/updatePortfolio/:id',
  authentication,
  upload.array('images', 5),
  validator.body(validate.updatePortfolio),
  errorHandler(controller.updatePortfolio),
);
router.delete(
  '/deletePortfolio/:id',
  authentication,
  errorHandler(controller.deletePortfolio),
);
router.delete(
  '/deleteMultiplePortfolio',
  authentication,
  errorHandler(controller.deleteMultiplePortfolio),
);

module.exports = router;
