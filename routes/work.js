const express           = require('express');
const itemsController   = require('../controllers/workItems');
const router            = express.Router();

router.get('/work', itemsController.getMainPage);

router.post('/work', itemsController.postNewItem);

router.post('/deleteWork', itemsController.deleteItem);

module.exports = router;