var express = require('express');
var connection  = require('../connection');

module.exports.rest_by_id=(req,res)=>{
    var rest_id = req.body.rest_id;

    var sql="select distinct(cus_name) from dishes natural join cuisine where rest_id=?;select * from restaurant natural join avg_cost where rest_id=?";
    var user=[rest_id,rest_id];
    connection.query(sql,user, (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
            
                res.json({
                    status:true,
                    cuisine: results[0],
                    restaurant:results[1],
                    message:'data fetched sucessfully'
                });
            
            
        }
      });
}