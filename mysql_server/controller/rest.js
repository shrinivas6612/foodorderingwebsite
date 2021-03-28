var express = require('express');
var connection = require('../connection');

module.exports.rest=(req,res)=>{
    
    connection.query('select * from restaurant', (error, results, fields)=> {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        });
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        });
      }
    });
   
}
