/* Importing the express module. */
const express = require('express')
/* Creating a router object. */
const router = express.Router()
/* Importing the employee.controller.js file. */
const employeeController = require('../controllers/employee.controller');
/* Creating a route for the `findAll` function in the `employeeController.js` file. for retrieving
all the employees */
router.get('/', employeeController.findAll);
/* Creating a route for the `create` function in the `employeeController.js` file. for creating a new
employee. */
router.post('/', employeeController.create);
/* Creating a route for the `findById` function in the `employeeController.js` file. for retrieving
a single employee with id. */
router.get('/:id', employeeController.findById);
/* Creating a route for the `update` function in the `employeeController.js` file. for updating a
single employee with id. */
router.put('/:id', employeeController.update);
/* A route for the `patch` function in the `employeeController.js` file. for updating a
single employee partially with id. */
router.patch('/:id', employeeController.patch);
/* A route for the `delete` function in the `employeeController.js` file. for deleting the
employee with the id. */
router.delete('/:id', employeeController.delete);
/* Exporting the router object. */
module.exports = router