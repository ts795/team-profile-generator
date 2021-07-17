const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

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

// Get an intern's information
const getInternInfo = function() { return new Promise((resolve, reject) => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: "What is your intern's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is your intern's id?",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the intern's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is your intern's school?",
      name: 'school',
    }
  ])
  .then((response) => {
    employees.push(new Intern(response.name, response.id, response.email, response.school));
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
    } else if (response.action === "Add an intern") {
      return getInternInfo();
    } else {
      return getRestOfUsers();
    }
  }).then((response) => {
    resolve(response);
  }) 
})};

// Create HTML for employees
function createEmployeeHTMLDivs() {
  var allDivs = '';
  for (var idx = 0; idx < employees.length; idx++) {
    var name = employees[idx].getName();
    var role = employees[idx].getRole();
    var id = employees[idx].getId();
    var email = employees[idx].getEmail();
    var emailHTML = `<a href = "mailto:${email}">${email}</a>`;
    // Third item displayed depends on the role
    var thirdItem = '';
    var iconForRole = '';
    if (role === "Manager") {
      // Managers have an office number
      var officeNumber = employees[idx].officeNumber;
      thirdItem = `Office number: ${officeNumber}`;
      iconForRole = '<span class="fas fa-mug-hot"></span>';
    } else if (role === "Engineer") {
      // Engineers have a github link
      var github = employees[idx].getGithub();
      var githubLink = `<a href = "https://github.com/${github}">${github}</a>`;
      thirdItem = `GitHub: ${githubLink}`;
      iconForRole = '<span class="fas fa-glasses"></span>';
    } else {
      // Interns have a school
      var school = employees[idx].getSchool();
      thirdItem = `School: ${school}`;
      iconForRole = '<span class="fas fa-user-graduate"></span>';
    }

    var employeeDivTemplate = `
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-header bg-primary border-success text-white">
            <h2> ${name}</h2>
            <h3> ${iconForRole} ${role}</h3>
          </div>
          <div class="card-body bg-light">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: ${emailHTML}</li>
              <li class="list-group-item">${thirdItem}</li>
            </ul>
          </div>
        </div>
      </div>
    `
    allDivs += employeeDivTemplate;
  }
  return allDivs;
}

// Create the HTML for the team information
function createTeamInformationHTML() {
  var employeeDivs = createEmployeeHTMLDivs();
  var html = `
  <!DOCTYPE html>
    <html lang="en-US">
    
      <head>
        <meta charset="UTF-8">
        <title>My Team</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
      </head>
    
      <body>
        <main>
          <header>
            <div class="p-5 mb-4 bg-danger rounded-3">
              <div class="container-fluid py-5 text-center text-white">
                <h1 class="display-5 fw-bold">My Team</h1>
              </div>
            </div>
          </header>
          <div class="album py-5">
            <div class="container">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${employeeDivs}
              </div>
            </div>
          </div>
        </main>
      </body>
    
    </html>
  `;
  fs.writeFile("dist/index.html", html, (err) =>
  err ? console.error(err) : console.log('HTML file is at dist/index.html!'));
}

// Get the manager's info
getManagerInfo
  .then((response) => {
    return getRestOfUsers();
  })
  .then((response) => {
    createTeamInformationHTML();    
  });