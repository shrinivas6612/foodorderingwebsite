
var express = require("express");
var router = express.Router();

var rest_name = require('../controller/rest_name');
var restaurants = require('../controller/rest');
var restaurantList = require('../controller/Filter');
var Mealtype = require('../controller/mealtype');
var cityname = require('../controller/city_name');
var rest_id = require('../controller/rest_id');
var rest_id_ = require('../controller/rest_id_single');
var rest_string = require('../controller/rest_string');
var signin = require('../controller/signin');
var signup = require('../controller/signup');
var rest_byid = require('../controller/resbyid');
var feed = require('../controller/feedback');
var dishid=require('../controller/dishbyid');

router.get('/rest_name',rest_name.restaurant_name);
router.get('/rest',restaurants.rest);
router.get('/mealtype' ,Mealtype.mealtype);
router.post('/rest_filter', restaurantList.restaurantbybody);
router.get('/city',cityname.city_name );
router.post('/rest_id',rest_id.rest_ident);
router.post('/rest_id_s',rest_id_.rest_id_single);
router.post('/rest_st',rest_string.rest__name_string);
router.post('/signin',signin.sign_in);
router.post('/signup',signup.sign_up);
router.post('/restbyid',rest_byid.rest_by_id);
router.post('/feedback',feed.feedback);
router.post('/dishbyid',dishid.dishes);

module.exports = router;