var express = require('express');
var connection = require('../connection');

 
module.exports.city_name = (req, res) => {
    
    connection.query('select distinct(city_name),city_id from restaurant', (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            res.json({
              status:true,
              city: results,
              message:'data fetched sucessfully'
          });
        }
      });
  
}