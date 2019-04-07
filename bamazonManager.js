var inquire= require('inquirer');
var sql= require('mysql');

var connection= sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    run();
});

function run(){
    inquire.prompt({
        name: "choice",
        type: "list",
        message: "Manager Menu:",
        choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Exit"]
    }).then(function(response){
        switch(response.choice){
            case "View Products for Sale":
                inventory();
                break;
            case "View Low Inventory":
                low_inventory();
                break;
            case "Add to Inventory":
                add_inventory();
                break;
            case "Add New Product":
                new_inventory();
                break;
            case "Exit":
                console.log("Signing off......");
                process.exit();
        }
    })
}

function inventory(){
    var query= 'Select * FROM products';
    connection.query(query,function(err,res){
        function item(ID,Name,Price,Quantity) {
            this.ID= ID;
            this.Name= Name;
            this.Price= Price;
            this.Quantity= Quantity;
        }
        var inv= [];
        for(var i=0; i< res.length; i++){
            inv.push(new item(res[i].item_id,res[i].product_name,res[i].price,res[i].stock_quantity));
        }
        console.table(inv);
        run();
    })
}

function low_inventory(){
    var query= 'Select * FROM products WHERE stock_quantity <= 5';
    connection.query(query,function(err,res){
        function item(ID,Name,Price,Quantity) {
            this.ID= ID;
            this.Name= Name;
            this.Price= Price;
            this.Quantity= Quantity;
        }
        var inv= [];
        for(var i=0; i< res.length; i++){
            inv.push(new item(res[i].item_id,res[i].product_name,res[i].price,res[i].stock_quantity));
        }
        console.table(inv);
        run();
    })
}

function add_inventory(){
    inquire.prompt([{
        name: "id",
        type: "input",
        message: "Choose item ID which you will like to add more of: "
    },{
        name: "add",
        type: "input",
        message: "How many would you like to add? "
    }]).then(function(response){
        var item= response.id;
        var number= response.add;
        var query1= "SELECT * FROM products WHERE ?"
        var query2= "UPDATE products SET ? WHERE item_id="+item;

        connection.query(query1,{item_id: item},function(err,res1){
            connection.query(query2,{stock_quantity: res1[0].stock_quantity+ parseInt(number)},function(err,res2){
                console.log("You added "+number+" of item "+res1[0].product_name);
                run();
            })
        })
    })
}

function new_inventory(){
    inquire.prompt([{
        name: "name",
        type: "input",
        message: "Name of product: "
    },{
        name: "department",
        type: "input",
        message: "Department: "
    },{
        name: "price",
        type: "input",
        message: "Price: "
    },{
        name: "stock",
        type: "input",
        message: "Available Stock: "
    }]).then(function(response){
        var query= "INSERT INTO products SET ?";
        var property= {
            product_name: response.name,
            department_name: response.department,
            price: response.price,
            stock_quantity: response.stock
        }

        connection.query(query,property,function(err,res){
            console.log(response.name+" added to inventory!");
            run();
        })
    })
}
