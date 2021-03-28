var express = require('express');
var connection  = require('../connection');

module.exports.sign_up=(req,res)=>{
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    var sql = "insert into user(fname,lname,email,pass_w) values(?,?,?,?)";
    var newuser = [firstname,lastname,email,password];
    connection.query(sql,newuser, (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error'
          });
        }else{
            
                res.json({
                    status:true,
                    rest_string: results,
                    message:'created account successfully'
                });
            
            
        }
      });
}