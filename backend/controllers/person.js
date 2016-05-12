/**
 * Created by I312177 on 5/9/2016.
 */
"use strict";

var config = require('../config');
var userDBModel = require('../models/person.js');
var crypt = require('../utils/crypt.js');
var user =new userDBModel.Schema("person").model;
exports.login = function (req, res, next) {
    res.render('login.html',{message:""});
};
exports.onLogin = function (req, res, next) {
    var mdPassword=crypt.md5(req.body.password);
    var queryObj = {userName:req.body.userName,password:mdPassword};
    user.findOne(queryObj,function(err,userInfo){
        if(err){

            res.render('./login.html',{message:"登陆失败！"});
        }else{
            if(userInfo){
                res.redirect("/index")
            }else{
                res.render('./login.html',{message:"用户名和密码错误！"});
            }
        }
    })
};
exports.addPerson = function (){
    var personEntity = new person();
    personEntity.userName=req.body.userName;
    var mdPassword=crypt.md5(req.body.password);
    personEntity.password=mdPassword;
    personEntity.save(function (err,userInfo){

    })
};

exports.personList=function(req, res, next){
    user.find({},function(err,personList){
        //res.render('./person/persons.html',{personList:personList});
        res.json({personList:personList});
    });

};

exports.personManager = function (req,res,next){

};

