const express = require('express');
const router = express.Router();
const controller = require('../controller/portfolioController');
const validate = require('../validation/portfolioValidation');
const { validator } = require('../middleware/validator');
const upload = require('../middleware/multer');
const { authentication } = require('../middleware/authenticate');

router.post('/addPortfolio',authentication,upload.array('images',5),validator.body(validate.portfolio),controller.addPortfolio);
router.get('/viewPortfolio/:id',authentication,controller.viewPortfolio);
router.put('/updatePortfolio/:id',authentication,upload.array('images',5),validator.body(validate.updatePortfolio),controller.updatePortfolio);
router.delete('/deletePortfolio/:id',authentication,controller.deletePortfolio);
router.delete('/deleteMultiplePortfolio',authentication,controller.deleteMultiplePortfolio);


module.exports=router;