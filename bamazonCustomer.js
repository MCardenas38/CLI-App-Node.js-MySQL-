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
        inquire.prompt([{
            name: "id",
            type: "input",
            message: "What item would you like to buy? (Enter ID) "
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?"
        }]).then(function(answer){
            process(answer.id,answer.amount);
        })
    })
}

function process(item,amount){
    var query= 'SELECT COUNT(*) AS count FROM products';
    connection.query(query,function(err,res){
        if(res[0].count>=item){
            query= 'SELECT * FROM products WHERE ?';
            var stock;
            connection.query(query,{item_id: item},function(err,res2){
                stock= res2[0].stock_quantity;
                if(stock>=amount){
                    query= 'UPDATE products SET ? WHERE item_id='+item;
                    connection.query(query,{stock_quantity: stock-amount},function(err,res3){
                        console.log("Your total: "+ res2[0].price*amount);
                        run();
                    });
                }
                else{
                    console.log("Insufficient quantity!");
                    run();
                }
            });
        }
        else{
            console.log("No item matching ID found.");
            run();
        }
    });
}

