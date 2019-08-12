const mysql = require('mysql')
const inquirer = require('inquirer')
const {table} = require('table')
var listOfIds = []

var connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.connect(function(err) {
    if (err) throw err;
    displayProducts()
})

displayProducts = () => {
    var query = 'SELECT id, product_name, price, stock_quantity FROM products'
    connection.query(query, function(err, res){
        if (err) throw err;
        // console.log(res)
        console.log(">>>>>>>>>>>>>>>>>>>>BAMAZON<<<<<<<<<<<<<<<<<<<<")
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
    inquirer
        .prompt({
            
                name: 'purchaseID',
                type: 'number',
                message: "Enter the ID of the product you'd like to buy",
                validate: function(value){
                    if (listOfIds.indexOf(value) !== -1){
                        return true
                    }
                    return false
                
            }
        })
        .then(function(answer){
            makePurchase(answer.purchaseID)
        })
}

makePurchase = (productID) => {
    
}