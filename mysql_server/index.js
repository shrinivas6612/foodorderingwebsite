var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var approuter = require('./routers/router');
var connection  = require('./connection');
const app = express();
const port = process.env.port||9000;

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    next();
});

app.use ('/',approuter);
app.listen(port , function(){console.log('The server is running on ', port)} );

