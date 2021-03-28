var express = require('express');
var connection  = require('../connection');

module.exports.rest_id_single=(req,res)=>{
    var rest_name1 = req.body.restaurant_name;


    connection.query('select rest_id from restaurant where rest_name=?',[rest_name1], (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            res.json({
              status:true,
              rest_name: results,
              message:'data fetched sucessfully'
          });
        }
      });
}