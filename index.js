const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');

// Get the manager's information that is obtained from the command line
// Returns a manager object
const getManagerInfo = new Promise((resolve, reject) => {
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the team manager's name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "What is the team manager's id?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the team manager's email?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the team manager's office number?",
        name: 'officeNumber',
      }
    ])
    .then((response) => {
      resolve({name: response.name, id: response.id, email: response.email, officeNumber: response.officeNumber});
    })
});

var employees = [];

// Get the manager's info
getManagerInfo
  .then((response) => {
    employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
    console.log(employees);
});