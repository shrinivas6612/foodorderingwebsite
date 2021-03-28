var express = require('express');
var connection  = require('../connection');

module.exports.dishes=(req,res)=>{
    var rest_id = req.body.rest_id;

    var sql="select * from dishes where rest_id=?";
    var user=[rest_id];
    connection.query(sql,user, (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            
                res.json({
                    status:true,
                    dishes: results,
                    message:'data fetched sucessfully'
                });
            
            
        }
      });
}