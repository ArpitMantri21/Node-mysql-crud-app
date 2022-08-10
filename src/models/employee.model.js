"use strict";
/* Importing the database connection file. */
const dbConn = require("./../../config/db.config");
/**
 * It creates a new object with the properties of the object passed to it.
 * @param employee - This is the object that contains the data that we want to insert into the
 * database.
 */
const Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.phone = employee.phone;
  this.organization = employee.organization;
  this.designation = employee.designation;
  this.salary = employee.salary;
  this.status = employee.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

/* Creating a new employee. */
Employee.create = (newEmp) =>
  new Promise((resolve, reject) => {
    dbConn.query("INSERT INTO employee set ?", newEmp, function (err, res) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        console.log(res.insertId);
        resolve(res.insertId);
      }
    });
  });

/* A function to find the employee by id. */
Employee.findById = (id) =>
  new Promise((resolve, reject) => {
    dbConn.query(
      "Select * from employee where id = ? ",
      id,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

/* A function to find all the employee */
Employee.findAll = () =>
  new Promise((resolve, reject) => {
    dbConn.query("Select * from employee", function (err, res) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        console.log("employee : ", res);
        resolve(res);
      }
    });
  });

/* Updating the employee table with the values passed in the employee object. */
Employee.update = (id, employee) =>
  new Promise((resolve, reject) => {
    dbConn.query(
      "UPDATE employee SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
      [
        employee.first_name,
        employee.last_name,
        employee.email,
        employee.phone,
        employee.organization,
        employee.designation,
        employee.salary,
        id,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

/* Updating the employee table with the values passed in the employee object for specific key. */
Employee.patch = (id, employee) =>
  new Promise((resolve, reject) => {
    console.log("Patch");
    console.log(employee);
    let queryString = "";
    let value = [];
    for (let emp in employee) {
      if (employee[emp]) {
        queryString = queryString + emp + "=?" + ",";
        value.push(employee[emp]);
      }
    }
    queryString = queryString.slice(0, -1);
    value.push(id);

    dbConn.query(
      "UPDATE employee SET " + queryString + " WHERE id = ?",
      value,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

/* Deleting the employee from the database. */
Employee.delete = (id) =>
  new Promise((resolve, reject) => {
    dbConn.query(
      "DELETE FROM employee WHERE id = ?",
      [id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });

/* Exporting the Employee object so that it can be used in other files. */
module.exports = Employee;
