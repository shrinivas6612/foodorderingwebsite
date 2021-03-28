var express = require('express');
var connection  = require('../connection');

module.exports.rest__name_string=(req,res)=>{
    var string = req.body.restaurant_string;


    connection.query("select rest_name,thumb from restaurant where rest_name like '%"+ string+"%' ", (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            
                res.json({
                    status:true,
                    rest_string: results,
                    message:'data fetched sucessfully'
                });
            
            
        }
      });
}