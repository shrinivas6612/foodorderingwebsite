var express = require('express');
var connection = require('../connection');

module.exports.rest_ident=(req,res)=>{
    
    var res_name = req.body.restaurant;
    var sql;

    if(res_name){
        sql ='select rest_id from restaurant where rest_name=res_name';
    }
    
    connection.query(sql, (error, results, fields)=> {
      if (error) {
         res.json({
            status:false,
            message:'there are some error with query'
        });
      }else{
            res.json({
            status:true,
            mealtype:results,
            message:'data fetched sucessfully'
        });
      }
    });
}