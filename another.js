const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');
​
/*
  This is an example of how to build an app using pure functions
  and leveraging delecarative programming
  https://tylermcginnis.com/imperative-vs-declarative-programming/
*/
​
// Creates a connection to mysql with configurations
const c = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ceeyasey13",
  database: "employee_tracker_db"
});
​
// Makes connection.query into a promise
// Note: with conection.query you have to bind the connection maintain scope 
const queryAsync = util.promisify(c.query).bind(c);
​
// Intializes the app with a query to make all of the needed data available
async function init() {
  try {
    // Arrange
    const query = "SELECT id,name FROM actors";
​
    // Action
    const result = await queryAsync(query);
​
    // Passes the array returned from the query to begin the program
    run(result);
  } catch(err) {
    throw err;
  }
};
​
// Starts the application and sets up a list of charaters to choose from
async function run(choices) {
  try {
    // Arrange
    const question = [{
      type: "list",
      name: "name",
      message: "What's your characters",
      choices // Uses results from the database
      /*
        choices: (Array|Function) Choices array or a function returning 
        a choices array. If defined as a function, the first parameter 
        will be the current inquirer session answers. Array values can 
        be simple numbers, strings, or objects containing a name (to 
        display in list), a value (to save in the answers hash) and a 
        short (to display after selection) properties. The choices array 
        can also contain a Separator.
      */
    }];
​
    // Action
    const { name } = await inquirer.prompt(question);
    // Passes name and choices to relate the name selected to choices available
    checkActor(name, choices);
  } catch(err) {
    throw err;
  }
}
​
// Checks to see what the id of the actor is
async function checkActor(name, actors) {
  try {
    // Arrange
    const question = [{
      type: "input",
      name: "actor",
      message: "replace with?"
    }];
​
    // Action
    const { actor } = await inquirer.prompt(question);
    const { id } = actors.find(o => o.name === name);
    // Passes the actor name and selected id to update
    update(actor, id);
  } catch(err) {
    throw err;
  }
}
// Updates the selected actor's name
async function update(name, id) {
  try {
    // Arrange
    const query = "UPDATE actors SET name = ? WHERE id = ?";
    const template = `%s Updated: "name" to %s at "index" %s`;
    const question = [{
      type: "confirm",
      name: "restart",
      message: "Would you like to update someone else?"
    }];
​
    // Action
    // Query to update the name of the selected actor
    const { message } = await queryAsync(query, [name,id]);
    // --start Confirms if the user wants to update another actor's name
    const { restart } = await inquirer.prompt(question);
​
    if (restart) {
      // Restarts the app
      return init();
    } else {
      // Logs the most recently updated value and ends the app
      console.log(template, message, name, id);
      process.exit();
    }
    // --end Confirms if the user wants to update another actor's name
  } catch(err) {
    throw err;
  }
}
​
init();
