var express = require('express');
var connection  = require('../connection');

module.exports.feedback=(req,res)=>{
    const email = req.body.email;
    const phone = req.body.mobile;
    const comment=req.body.comments

    var sql = "insert into feedback(phone,email,comments) values(?,?,?)";
    var newuser = [phone,email,comment];
    connection.query(sql,newuser, (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
                    res.json({
                        status:true,
                        feedback: results,
                        message:'data added sucessfully'
                    });
            }
        
      });
      

}