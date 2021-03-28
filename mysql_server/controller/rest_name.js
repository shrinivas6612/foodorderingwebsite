var express = require('express');
var connection  = require('../connection');

module.exports.restaurant_name=(req,res)=>{

    connection.query('select rest_name from restaurant', (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            res.json({
              status:true,
              restaurant: results,
              message:'data fetched sucessfully'
          });
        }
      });
}