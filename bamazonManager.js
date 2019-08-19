const mysql = require('mysql')
const inquirer = require('inquirer')
const {table} = require('table')
var listOfIds = []
const chalk = require('chalk')

var connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.connect(function(err) {
    console.log("Connecting...")
    if (err) throw err;
    managerOptions()
})

managerOptions = () => {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "Options",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer){
            switch (answer.menu) {
                case "View Products for Sale":
                    viewProducts()
                break

                case "View Low Inventory":
                    viewLowInventory()
                break
                
                case "Add to Inventory":
                    addToInventory()
                break

                case "Add New Product":
                    addNewProduct()
                break
            }
        })
}

viewProducts = () =>{
    var query = 'SELECT id, product_name, price, stock_quantity, department_name FROM products'
    connection.query(query, function(err, res){
        if (err) throw err;
        // console.log(res)
        console.log(chalk.whiteBright.bgBlue.bold(">>>>>>>>>>>>>>>>>>>>BAMAZON MANAGER<<<<<<<<<<<<<<<<<<<<"))
        for (var i = 0; i < res.length; i++){
            listOfIds.push(res[i].id)
            console.log(
                'ID: ' + res[i].id + " || Product: " + res[i].product_name + " || " + "Price: $" + res[i].price + " || Available: " + res[i].stock_quantity + " || Department: " + res[i].department_name + " ||"
            )
        }
        managerOptions()
    })
}

viewLowInventory = () => {
    var query = 'SELECT id, product_name, price, stock_quantity, department_name FROM products WHERE stock_quantity < 10'
    connection.query(query, function(err, res){
        if (err) throw err;
        // console.log(res)
        console.log(chalk.whiteBright.bgRed.bold("Low Stock Items"))
        for (var i = 0; i < res.length; i++){
            
                console.log(
                    'ID: ' + res[i].id + " || Product: " + res[i].product_name + " || " + "Price: $" + res[i].price + " || Available: " + res[i].stock_quantity + " || Department: " + res[i].department_name + " ||"
                )
            
        }
        
        managerOptions()
    })
}

addToInventory = () => {
    inquirer
        .prompt([
            
            {
            name: "productID",
            type: "number",
            message: "Which product would you like to ressuply?",
            validate: function(value){
                if (listOfIds.indexOf(value) !== -1){
                    return true
                } 
                return 'Please Enter a valid Product ID'
            }
        }, {
            name: "amount",
            type: "number",
            message: "How many would you like to add?",
            validate: function(value){
                if (value > 0){
                    return true
                }
                return 'Value must be greater than 0'
            }
        }
    ])
    .then(function(answer){
        var query = `UPDATE products SET stock_quantity = stock_quantity + ${answer.amount} WHERE id = ${answer.productID}`
        connection.query(query, function(err, res){
            if (err) throw err
            managerOptions()
        })
    })
}

addNewProduct = () =>{
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "Enter Product Name"
            },
            {
                name: "price",
                type: 'number',
                message: "Enter Product Price",
                validate: function(value){
                    if (value > 0){
                        return true
                    }
                    return 'Price Must be Above $0'
                }
            },
            {
                name: 'quantity',
                type: 'number',
                message: "Enter Product Quantity",
                validate: function(value){
                    if (value > 0){
                        return true
                    }
                    return 'Quantity Must be Above 0'
                }
            },
            {
                name: "department",
                type: "input",
                message: "Enter Product Department"
            }
        ])
        .then(function(answer){
            var query = "INSERT into products (product_name, department_name, price, stock_quantity) "
            query += `VALUES ("${answer.productName}", "${answer.department}", ${answer.price}, ${answer.quantity})`
            connection.query(query, function(err, res){
                if (err) throw err
                managerOptions()
            })
        })
}

