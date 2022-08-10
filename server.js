/* Importing the express module. */
const express = require("express");
/* A middleware that parses the body of the request. */
const bodyParser = require("body-parser");
/* Creating an instance of the express module. */
const app = express();
/* Setting the port to 5000 if the environment variable PORT is not set. */
const port = process.env.PORT || 5000;
/* A middleware that parses the body of the request of content-type - application/x-www-form-urlencoded. */
app.use(bodyParser.urlencoded({ extended: true }));
/* A middleware that parses the body of the request of content-type - application/json. */
app.use(bodyParser.json());
/* Root route: This is a route handler. It is a function that is executed when the route matches the URL. */
app.get("/", (req, res) => {
  res.send("Hello World");
});
/* Importing the employee.routes.js file. */
const employeeRoutes = require("./src/routes/employee.routes");
/* Using the employeeRoutes as middleware. */
app.use("/api/v1/employees", employeeRoutes);
/* Listening for requests on the port 5000. */
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
/* This is a route handler. It is a function for error handling */
app.all("*", (req, res) => {
  const err = new Error(`Requested URL ${req.path} not found!`);
  res.status(404).json({
    success: 0,
    message: err.message,
    stack: err,
  });
});
