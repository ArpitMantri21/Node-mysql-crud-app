'use strict';
const dbConn = require('./../../config/db.config');
//Employee object create
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

Employee.create = (newEmp) => new Promise((resolve, reject) => {
  dbConn.query("INSERT INTO employee set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    }
    else {
      console.log(res.insertId);
      resolve(res.insertId);
    }
  });
});

Employee.findById = (id) => new Promise((resolve, reject) => {
  dbConn.query("Select * from employee where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    }
    else {
      resolve(res);
    }
  });
});

Employee.findAll = () => new Promise((resolve, reject) => {
  dbConn.query("Select * from employee", function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    }
    else {
      console.log('employee : ', res);
      resolve(res);
    }
  });
});

Employee.update = (id, employee) => new Promise((resolve, reject) => {
  dbConn.query("UPDATE employee SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

Employee.patch = (id, employee) => new Promise((resolve, reject) => {
  console.log('Patch')
  console.log(employee)
  let queryString = "";
  let value = [];
  for (let emp in employee){
    if (employee[emp]) { 
      queryString = queryString + emp + "=?" + ",";
      value.push(employee[emp]);
    } 
  }
  // queryString = queryString.replace(/,\s*$/, "");
  queryString = queryString.slice(0,-1);
  value.push(id);

  console.log(queryString);
  console.log(value);
  // dbConn.query("UPDATE employee SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id], function (err, res) {
    dbConn.query("UPDATE employee SET "+ queryString +" WHERE id = ?", value, function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

Employee.delete = (id) => new Promise((resolve, reject) => {
  dbConn.query("DELETE FROM employee WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      reject(err);
    }
    else {
      resolve(res);
    }
  });
});

module.exports = Employee;