var express = require('express');
var connection = require('../connection');

module.exports.mealtype=(req,res)=>{
    
    connection.query('select * from mealtype', (error, results, fields)=> {
      if (error) {
         res.json({
            status:false,
            message:'there are some error with query'
        });
      }else{
            res.json({
            status:true,
            mealtype:results,
            message:'user registered sucessfully'
        });
      }
    });
}