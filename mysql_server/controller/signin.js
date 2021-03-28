var express = require('express');
var connection  = require('../connection');

module.exports.sign_in=(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    var sql ="select * from user where email=? and pass_w=?;update user set l_date=current_date(),l_time=current_time() where email=? and pass_w=?";
    var update ="update user set l_login=current_timestamp() where email=? and pass_w=?";
    var loginuser=[email,password,email,password];
    connection.query(sql,loginuser, (error, results, fields)=> {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          });
        }else{
                if(results[0].length>=1){
                    res.json({
                        status:true,
                        autheciation:true,
                        rest_string: results[0],
                        update:results[1],
                        message:'data fetched sucessfully'
                    });
                }else{
                    res.json({
                        status:true,
                        autheciation:false,
                        rest_string: results[0],
                        update:results[1],
                        message:'data  not fetched '
                    });
                }
               
            
            
        }
        
      });
      

}