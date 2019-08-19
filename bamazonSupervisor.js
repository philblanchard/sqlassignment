const mysql = require('mysql')
const inquirer = require('inquirer')
const {table} = require('table')
var listOfIds = []
const chalk = require('chalk')
const cTable = require('console.table');

var connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.connect(function(err) {
    console.log('Connecting...')
    if (err) throw err;
    supervisorOptions()
})

supervisorOptions = () => {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "Options",
            choices: [
                "View Product Sales",
                "Add New Department"
            ]
        })
        .then(function(answer){
            switch (answer.menu) {
                case "View Product Sales":
                    viewSales()
                break

                case "Add New Department":
                    createDepartment()
                break
            }
        })
}

viewSales = () => {
    inquirer
        .prompt([
            {
                name: 'department',
                type: 'input',
                message: "Enter Department's Name to View Sales"
            }
        ])
        .then(function(answer){
            var query = `SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs as total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_name`
            connection.query(query, function(err, res){
                if (err) throw err
                console.table(res)
            })
        })
}


createDepartment = () => {
    var questions = [
            {
                name: 'departmentName',
                type: 'input',
                message: 'Enter New Department Name'
            },
            {
                name: 'overheadCost',
                type: 'number',
                message: 'Enter Department Overhead Cost',
                validate: function(value){
                    if (value > 0){
                        return true
                    }
                    return 'Overhead Cost must be greater than 0'
                }
            }
        ]
        inquirer.prompt(questions).then(answers => {
            query = `INSERT into departments (department_name, over_head_costs) `
            query =+ `VALUES ("${answers.departmentName}", "${answers.overheadCost}")`
            connection.query(query, function(err, res){
                if (err) throw err
                supervisorOptions()
            })
        })
        
}