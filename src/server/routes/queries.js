const express = require('express');
const router = express.Router(); 
const queriesController = require('../controllers/queriesController')


router.get('/query-one', queriesController.getQueryOne);
router.get('/query-two', queriesController.getQueryTwo);
router.get('/query-three', queriesController.getQueryThree);
router.get('/query-four', queriesController.getQueryFour);

module.exports = router;