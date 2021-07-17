const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');

var employees = [];

// Get the manager's information that is obtained from the command line
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
    employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
    resolve("Done");
  })
});

// Get an engineer's information
const getEngineerInfo = function() { return new Promise((resolve, reject) => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: "What is your engineer's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is your engineer's id?",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the engineer's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is your engineer's Github username?",
      name: 'github',
    }
  ])
  .then((response) => {
    employees.push(new Engineer(response.name, response.id, response.email, response.github));
    return getRestOfUsers();
  })
  .then((response) => {
    resolve(response);
  }) 
})};

// Get the rest of the users
const getRestOfUsers = function() { return new Promise((resolve, reject) => { 
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ["Add an engineer", "Add an intern", "Finish"]
    }
  ])
  .then((response) => {
    if (response.action === "Finish") {
      resolve(employees);
    } else if (response.action === "Add an engineer") {
      return getEngineerInfo();
    } else {
      return getRestOfUsers();
    }
  }).then((response) => {
    resolve(response);
  }) 
})};

// Get the manager's info
getManagerInfo
  .then((response) => {
    return getRestOfUsers();
  })
  .then((response) => {
    console.log(response);    
  });