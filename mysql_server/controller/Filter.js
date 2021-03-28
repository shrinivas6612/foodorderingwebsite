var express = require('express');
var connection = require('../connection');

module.exports.restaurantbybody = (req, res) => {
    var city = req.body.city;
    var cus=[];
    cus = req.body.cuisine;
    var mealtype = req.body.mealtype
    var lcost = req.body.lcost ? req.body.lcost : 1;
    var hcost = req.body.hcost ? req.body.hcost :10000;
    var sort = req.body.sort ? req.body.sort : 1;
    var pagination = req.body.pagination ? req.body.pagination : 1;
    var cuis=[];
    var temp=5;
    if(cus!=undefined){
        for(var i=0;i<cus.length;i++){
            cuis[i]=cus[i];
        }
        for(var i=cus.length;i<5;i++){
            cuis[i]=null;
        }
    }else{
        cuis = undefined;
    }

    var sql;
    var input=[];
    if (lcost && hcost) {
        if(sort==0){
            sql="select rest_name from restaurant natural join avg_cost where avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join avg_cost where avg between ? and ? order by avg asc";
        }
        
        input=[lcost,hcost];
    }
    

    if (mealtype) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where meal_id=? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where meal_id=? and avg between ? and ? order by avg asc";
        }
       
       input =[mealtype,lcost,hcost];
    }
    if (city) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where city_id=? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where city_id=? and avg between ? and ? order by avg asc"; 
        }
         
         input=[city,lcost,hcost];
    }
    if (cuis!=undefined) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and avg between ? and ? order by avg asc";
        }
        
        input=[cuis[0],cuis[1],cuis[2],cuis[3],cuis[4],lcost,hcost];
    }
    if (mealtype && city) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where city_id=? and meal_id=? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where city_id=? and meal_id=? and avg between ? and ? order by avg asc";
        }
        
        input=[city,mealtype,lcost,hcost];
    }
    if (mealtype && cuis!=undefined) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and meal_id=? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and meal_id=? and avg between ? and ? order by avg asc";
        }
        
        input=[cuis[0],cuis[1],cuis[2],cuis[3],cuis[4],mealtype,lcost,hcost];
    }
    if (city && cuis!=undefined) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and city_id = ? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and city_id = ? and avg between ? and ? order by avg asc"; 
        }
        
        input=[cuis[0],cuis[1],cuis[2],cuis[3],cuis[4],city,lcost,hcost];
    }
    if (city && cuis!=undefined && mealtype) {
        if(sort==0){
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and meal_id=? and city_id=? and avg between ? and ? order by avg desc";
        }else{
            sql="select rest_name from restaurant natural join dishes join avg_cost using(rest_id) where cus_id in(?,?,?,?,?) and meal_id=? and city_id=? and avg between ? and ? order by avg asc";
        }
        
        input=[cuis[0],cuis[1],cuis[2],cuis[3],cuis[4],mealtype,city,lcost,hcost]
    }
    var sql1;
    if(sort==-1){
         sql1 = "select * from restaurant natural join avg_cost where rest_name in("+sql+") order by avg desc;select distinct(cus_name),rest_id from dishes natural join cuisine";
    }else{
        sql1 = "select * from restaurant natural join avg_cost where rest_name in("+sql+") order by avg asc;select distinct(cus_name),rest_id from dishes natural join cuisine";
    }
    


    connection.query(sql1,input, (err, results, fields)=> {
        if (err) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
        }else{
            var pagi = Math.floor((results[0].length / 2) + (results[0].length % 2));
        

            if (pagination < pagi + 1) {
            var pa = (pagination - 1) * 2;
            var pa1 = pa + 2;
            res.json({ 
                message: 'data fetched successfully', 
                Total_records: results[0].length, 
                Totalpagin: pagi, 
                Records_per_pagignation: "2", 
                values: (results[0]).slice(pa, pa1),
                cuisines:results[1] });
                
            } else {
            res.json({ message: ' No data found' });
            }
        }
      });

}