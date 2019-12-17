const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ceeyasey13',
  database: 'employee_tracker_db'
});

connection.connect(function(err) {
  if(err) throw err;
  runTracker();
});


function runTracker() {
inquirer
  .prompt(
    {
      name: "starter",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles",
      ]
    })
    .then(function(answer) {
      switch(answer.starter) {
        case "Add departments, roles, employees":
          add();
          break;

        case "View departments, roles, employees":
          view();
          break;

        case "Update employee roles":
          update();
          break;
        
        case "exit":
        connection.end();
        break;
      }
    });
  }

  function add () {
  inquirer
  .prompt({
      name: "addQuestion",
      type: "list",
      message: "What would you like to add to?",
      choices: [
        "Add to departments",
        "Add to roles",
        "Add to employees",
      ]
    })
    .then(function(answer) {
      switch (answer.addQuestion) {
        case "Add to departments":
          addToDepartments();
          break;

        case "Add to roles":
          addToRoles();
          break;

        case "Add to employees":
          addToEmployees();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
  };

  function view () {
    inquirer
    .prompt({
        name: "viewQuestion",
        type: "list",
        message: "Which table would you like to view?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
        ]
      })
      .then(function(answer) {
        switch (answer.addQuestion) {
          case "View Departments":
            viewDepartments();
            break;
  
          case "View Roles":
            viewRoles();
            break;
  
          case "View Employees":
            viewEmployees();
            break;
  
          case "exit":
            connection.end();
            break;
        }
      });
  };

  function update () {

  };

  function addToDepartments() {
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the new department?"
      })
      .then(function(answer) {
        console.log(answer.departmentName);
        var query = "INSERT INTO departments (name) VALUES (?) ";
        connection.query(query, [answer.departmentName], function (err, res) {
          if (err) throw err;
        })
      })
  };

  function addToRoles() {
    inquirer
      .prompt([
        {
        name: "roleTitle",
        type: "input",
        message: "What is the job title for the new role?"
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the base salary for this role?"
      },
      {
        name: "roleDepartmentId",
        type: "input",
        message: "What department id will this new role fall under?"
      }
    ])
      .then(function(answer) {
        console.log(answer.roleTitle, answer.roleSalary, answer.roleDepartmentId);
        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?) ";
        connection.query(query, [[answer.roleTitle], [answer.roleSalary], [answer.roleDepartmentId]], function (err, res) {
          if (err) throw err;
        })
      });
  };

  function addToEmployees() {
    inquirer
    .prompt([
      {
      name: "employeeFirstName",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "employeeLastName",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "employeeRoleId",
      type: "input",
      message: "What is the employee's role id?"
    },
    {
      name: "employeeManagerId",
      type: "input",
      message: "What is the employee's manager's id?"
    }
  ])
    .then(function(answer) {
      console.log(answer.employeeFirstName, answer.employeeLastName, answer.employeeRoleId, answer.employeeManagerId);
      var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) ";
      connection.query(query, [[answer.employeeFirstName], [answer.employeeLastName], [answer.employeeRoleId], [answer.employeeManagerId]], function (err, res) {
        if (err) throw err;
      })
    });
  };

  function viewDepartments() {
    var query = "SELECT * FROM departments;";
    connection.query(query, function (err, res) {
      if(err) throw err;
      console.log(res);
    });
  };

  function viewRoles() {
    
  };

  function viewEmployees() {
    
  };