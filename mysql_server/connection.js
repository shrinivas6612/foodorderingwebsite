var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Shri@6612",
    database:"zomato",
    multipleStatements:true
});
connection.connect((err)=>{
    if(!err){
        console.log("database connected");
    }else{
        console.log("database not connected");
       
    }
    });
    


module.exports = connection;