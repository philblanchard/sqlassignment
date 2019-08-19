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
    console.log('Connecting...')
    if (err) throw err;
    displayProducts()
})

displayProducts = () => {
    var query = 'SELECT id, product_name, price, stock_quantity FROM products'
    connection.query(query, function(err, res){
        if (err) throw err;
        // console.log(res)
        console.log(chalk.whiteBright.bgRed.bold(">>>>>>>>>>>>>>>>>>>>BAMAZON<<<<<<<<<<<<<<<<<<<<"))
        for (var i = 0; i < res.length; i++){
            listOfIds.push(res[i].id)
            console.log(
                'ID: ' + res[i].id + " || Product: " + res[i].product_name + " || " + "Price: $" + res[i].price + " || Available: " + res[i].stock_quantity + " ||"
            )
        }
        initChoice()
    })
}

initChoice = () => {
    var questions = [
        {
            type: 'number',
            name: 'purchaseID',
            message: "Enter the ID of the product you'd like to purchase: ",
            validate: function(value){
                if (listOfIds.indexOf(value) !== -1){
                    return true
                } 
                return 'Please Enter a valid Product ID'

            }
        },
        {
            type: 'number',
            name: 'quantity',
            message: 'How many would you like to buy?',
            validate: function(value){
                if (value > 0){
                    return true
                }
                return 'Value must be greater than 0'
            }
        }
    ]

    inquirer.prompt(questions).then(answers => {
        verifyQuantity(answers.purchaseID, answers.quantity)
    }
    )


}

makePurchase = (productID, quantity, price) => {
    console.log(chalk.green(`Quantity: ${quantity} \n Price: $${price} \n Total: $`+ quantity*price) )
    query = `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE id = ${productID}`
    connection.query(query, function(err, res){
        if (err) throw err
        
    })
    displayProducts()
}

verifyQuantity = (productID, quantity) => {
    console.log('Verifying Purchase ' + productID) 
    query = `SELECT stock_quantity, price FROM products WHERE id=${productID}`
    connection.query(query, function(err, res){
        console.log(res[0].stock_quantity)
        if (err) throw err;
        if (quantity <= res[0].stock_quantity) {
            console.log('Creating Purchase')
            makePurchase(productID, quantity, res[0].price)
        } else {
            console.log(`Sorry, we dont have ${quantity} of those in stock`)
            displayProducts()
        }
        
    })
    
}