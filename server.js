const prompt = require('inquirer').createPromptModule()
const db = require('./config/db.js')



function start(){
prompt([
  {
    name: "todo",
    type: "list",
    message: "What do you want to do?",
    choices: [
      "Add departments, roles, employees", 
      "View employees by departments, roles", 
      "Delete departments, roles, and employees"]
  }
])
.then(function(answer){
  switch (answer) {
    case answer.todo ==='Add departments, roles, employees':
      addFunction()
      break;
    case answer.todo === 'View employees by departments, roles':
      viewFunction()
      break;
    case answer.todo === 'Delete departments, roles, and employees':
      deleteFunction()
      break;
  }
}
).catch(e => console.error(e))
}

function addFunction() {
  prompt([
    {
      name: "add",
      type: "list",
      message: "What do you want to add?",
      choices: [
        "Add department",
        "Add role",
        "Add employee"]
    }
  ])
    .then(function (answer){
      switch (answer) {
        case answer.add === 'Add department':
          addDepartment()
          break;
        case answer.add === 'Add role':
          addRole()
          break;
        case answer.add === 'Add employee':
          addEmployee()
          break;
    }}
  ).catch(e => console.error(e))
}

function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'what is the Department Name?'
    }
  ])
    .then(function (answer) {
      db.query('INSERT INTO department SET ?', { departmentname: answer.departmentName }, err => {
        if (err) throw err ;
        console.log('department was created successfully!');
        start()
         }
      })
  }
  ).catch(e => console.error(e))
}



function viewFunction() {
  prompt([
    {
      name: "view",
      type: "list",
      message: "View employees by departments or roles?",
      choices: [
        "By department",
        "By role"]
    }
  ])
    .then(function (answer) {
      switch (answer) {
        case answer.view === 'By department':
          byDepartment()
          break;
        case answer.view === 'By role':
          byRole()
          break;
      }}
  ).catch(e => console.error(e))
}

function deleteFunction() {
  prompt([
    {
      name: "delete",
      type: "list",
      message: "What do you want to delete?",
      choices: [
        "Delete department",
        "Delete role",
        "Delete employee"]
    }
  ])
    .then(function (answer) {
      switch (answer) {
        case answer.delete === 'Delete department':
          deleteDepartment()
          break;
        case answer.delete === 'Delete role':
          deleteRole()
          break;
        case answer.delete === 'Delete employee':
          deleteEmployee()
          break;
      }}
  ).catch(e => console.error(e))
}



start()