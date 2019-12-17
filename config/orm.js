const connection = require('./connect.js');

const orm = {
    addDepartment: function(table, departmentName) {
        var queryString = "INSERT INTO ?? VALUES ??";
        connection.query(queryString, [table, departmentName], function(err, result) {
            if(err) throw err;
            console.log(result);
        });
    },
    addrole: function(table, roleTitle, roleSalary, roleDepartmentId) {
        var queryString = "INSERT INTO ?? VALUES ??";
        connection.query(queryString, [table, roleTitle, roleSalary, roleDepartmentId], function(err, result) {
            if(err) throw err;
            console.log(result);
        });
    },
    addEmployee: function(table, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
        var queryString = "INSERT INTO ?? VALUES ??";
        connection.query(queryString, [table, employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId], function(err, result) {
            if(err) throw err;
            console.log(result);
        });
    },
    view: function(table) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [table], function(err, result) {
          if (err) throw err;
          console.log(result);
        });
    },

}

module.exports = orm;