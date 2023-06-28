const express = require('express');
const router = express.Router(); 
const departmentController = require('../controllers/departmentController')


router.post('/', departmentController.createDepartment);

router.get('/', departmentController.getDepartment);

router.put('/:id', departmentController.updateDepartment);

router.get('/:id', departmentController.getOneDepartment);

router.delete('/:id', departmentController.deleteOneDepartment);

module.exports = router;