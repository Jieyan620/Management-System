const prompt = require('inquirer').createPromptModule()
const db = require('./config/db.js')



function start() {
  prompt(
    {
      name: "todo",
      type: "list",
      message: "What do you want to do?",
      choices: [
        "Add departments, roles, and employees",
        "View employees by departments, roles",
        "Delete departments, roles, and employees"]
    }
  )
    .then(function (answer) {
      switch (answer.todo) {
        case 'Add departments, roles, and employees':
          addFunction()
          break;
        case 'View employees by departments, roles':
          viewFunction()
          break;
        case 'Delete departments, roles, and employees':
          deleteFunction()
          break;
      }

    })

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
    .then(function (answer) {
      switch (answer.add) {
        case 'Add department':
          addDepartment()
          break;
        case 'Add role':
          addRole()
          break;
        case 'Add employee':
          addEmployee()
          break;
      }
    }
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
        if (err) throw err;
        console.log('department was created successfully!');
        start()
      })
    })
}

function addRole() {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'what is the role title?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'how much is the salary?'
    },
    {
      type: 'input',
      name: 'departmentid',
      message: 'what is the department id?'
    }
  ])
    .then(function (answer) {
      db.query('INSERT INTO employeerole SET ?', 
      { title: answer.title,
        salary: answer.salary,
        departmentid: answer.departmentid
       }, err => {
        if (err) throw err;
        console.log('role was created successfully!');
        start()
      })
    })
}

function addEmployee() {
  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'what is the first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'what is the last name?'
    },
    {
      type: 'input',
      name: 'roleid',
      message: 'what is the role id?'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'what is the manager id?'
    }
  ])
    .then(function (answer) {
      db.query('INSERT INTO employees SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          roleid: answer.roleid,
          manager_id:answer.manager_id
        }, err => {
          if (err) throw err;
          console.log('emploryee was created successfully!');
          start()
        })
    })
}



function viewFunction() {
  prompt([
    {
      name: "view",
      type: "list",
      message: "View employees by departments or roles or all employees?",
      choices: [
        "By department",
        "By role",
        "All employees"
      ]
    }
  ])
    .then(function (answer) {
      switch (answer.view) {
        case'By department':
          byDepartment()
          break;
        case 'By role':
          byRole()
          break;
        case 'All employees':
          Allemployees()
          break;
      }
    })
}

function byDepartment() {
  db.query('SELECT * FROM department', (err, departments) => {
    if (err) { console.log(err) }
    console.log(departments)
  })
  prompt([
    {
      name: "departmentid",
      type: "input",
      message: "please input the department id"
    }
  ])
    .then(function (answer) {

      db.query(`SELECT roleid FROM employeerole WHERE departmentid = ${answer.departmentid}`,
        (err, roleid) => {
          if (err) { console.log(err) }
          console.log(roleid)
          // roleid is a array, need map it?
          db.query(`SELECT * FROM employees WHERE roleid = ${roleid}`,
            (err, emploryees) => {
              if (err) { console.log(err) }
              console.log(emploryees)
              start()
            }
          )
          
        }
      )
    })

}

function byRole() {
  db.query('SELECT * FROM employeerole', (err, emploryeerole) => {
    if (err) { console.log(err) }
    console.log(emploryeerole)
  })
  prompt([
    {
      name: "roleid",
      type: "input",
      message: "please input the role id"
    }
  ])
    .then(function (answer) {
  
  db.query(`SELECT * FROM employees WHERE roleid = ${answer.roleid}`,
   (err, emploryees) => {
    if (err) { console.log(err) }
    console.log(emploryees)
     start()
    }
    )
  })

}

function Allemployees() {
  db.query('SELECT * FROM emploryees', (err,emploryees) => {
    if (err) {console.log(err)}
    console.log(emploryees)
    start()
})
 
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
      switch (answer.delete) {
        case 'Delete department':
          deleteDepartment()
          break;
        case 'Delete role':
          deleteRole()
          break;
        case 'Delete employee':
          deleteEmployee()
          break;
      }
    })
  }

function deleteDepartment(){
  db.query('SELECT * FROM department', (err, departments) => {
    if (err) { console.log(err) }
    console.log(departments)
  })
  prompt([
    {
      name: "deletedepartment",
      type: "input",
      message: "please input the department id of the one will be deleted"
    }
  ])
    .then(function (answer) {
  db.query('DELETE FROM department WHERE ?', { departmentid: answer.deletedepartment }, err => {
    if (err) throw err;
    console.log('department was deleted successfully!');
    start()
  })
}) 
}

function deleteRole(){
  db.query('SELECT * FROM employeerole', (err, roles) => {
    if (err) { console.log(err) }
    console.log(roles)
  })
  prompt([
    {
      name: "deleterole",
      type: "input",
      message: "please input the role id of the one will be deleted"
    }
  ])
    .then(function (answer) {
      db.query('DELETE FROM employeerole WHERE ?', { roleid:answer.deleterole }, err => {
        if (err) throw err;
        console.log('role was deleted successfully!');
        start()
      })
    }) 
}

function deleteEmployee(){
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    console.log(employees)
  })
  prompt([
    {
      name: "deleteemployee",
      type: "input",
      message: "please input the employees id of the one will be deleted"
    }
  ])
    .then(function (answer) {
      db.query('DELETE FROM employees WHERE ?', { employeeid: answer.deleteemployee }, err => {
        if (err) throw err;
        console.log('employee was deleted successfully!');
        start()
      })
    })
}


start()