const express = require('express');
const router = express.Router(); // Middleware de direccionamiento y manejador de rutas
const employeeController = require('../controllers/employeeController')


// Asigna a la ruta /api/employee (POST) el método que envía un empleado nuevo a la base de datos.
router.post('/', employeeController.createEmployee);

// Asigna a la ruta /api/employee (GET) el método que trae y envía a todos los empleados hacia el frontend.
router.get('/', employeeController.getEmployee);

// Asigna a la ruta /api/employee/:id (PUT) el método que actualiza un documento de la base de datos con los datos traidos del frontend.
router.put('/:id', employeeController.updateEmployee);

// Asigna a la ruta /api/employee/:id (GET) el método que trae y envía un único empleado hacia el frontend.
router.get('/:id', employeeController.getOneEmployee);

// Asigna a la ruta /api/employee/:id (DELETE) el método que borra un empleado de la base de datos.
router.delete('/:id', employeeController.deleteOneEmployee);


module.exports = router;