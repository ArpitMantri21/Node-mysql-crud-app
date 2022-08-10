'use strict';
/* Importing the employee.model.js file. */
const Employee = require('../models/employee.model');
/* This is a function that is being exported to the employee.controller.js file. for finding all 
the employee */
exports.findAll = async (req, res) => {
  try {
    const EmpFindAll = await Employee.findAll();
    console.log(EmpFindAll);
    res.json(EmpFindAll);
  } catch (error) {
    console.error();
    res.status(404).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};

/* This is a function that is being exported to the employee.controller.js file. for creating a new
employee. */
exports.create = async (req, res) => {
  try {
    const new_employee = new Employee(req.body);
    //handles null error
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      const EmpCreate = await Employee.create(new_employee);
      console.log(EmpCreate);
      res.json({ error: false, message: "Employee added successfully!", data: EmpCreate });
    }
  } catch (error) {
    console.error();
    res.status(400).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};

/* This is a function that is being exported to the employee.controller.js file. for finding a 
employee by id. */
exports.findById = async (req, res) => {
  try {
    const EmpFindById = await Employee.findById(req.params.id);
    console.log(EmpFindById);
    res.json(EmpFindById);
  } catch (error) {
    console.error();
    res.status(404).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};

/* This is a function that is being exported to the employee.controller.js file. for updating a 
employee by id. */
exports.update = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      const EmpUpdate = await Employee.update(req.params.id, new Employee(req.body));
      console.log(EmpUpdate);
      res.json({ error: false, message: 'Employee successfully updated', data: EmpUpdate });
    }
  } catch (error) {
    console.error();
    res.status(400).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};

/* A function that is being exported to the employee.controller.js file. for updating the specific keys for
a employee by id. */
exports.patch = async (req, res) => {
  try {
      const EmpPatch = await Employee.patch(req.params.id, req.body);
      console.log(EmpPatch);
      res.json({ error: false, message: 'Employee successfully updated', data: EmpPatch });
    } catch (error) {
    console.error();
    res.status(400).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};

/* This is a function that is being exported to the employee.controller.js file. for deleting a 
employee by id. */
exports.delete = async (req, res) => {
  try {
    const EmpDelete = await Employee.delete(req.params.id);
    console.log(EmpDelete);
    res.json({ error: false, message: 'Employee successfully deleted', data: EmpDelete });
  } catch (error) {
    console.error();
    res.status(400).json({
      success: 0,
      message: error.message,
      stack: error
    });
  }
};