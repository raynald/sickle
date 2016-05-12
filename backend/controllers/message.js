/**
 * Created by fanjingdan on 5/9/2016.
 */
"use strict";

var config = require('../config');
var userDBModel = require('../models/person.js');
var crypt = require('../utils/crypt.js');
var user =new userDBModel.Schema("person").model;

exports.addMessage = function (){
    var messageEntity = new message();
    messageEntity.to_user=req.body.userName;
    var mdPassword=crypt.md5(req.body.password);
    messageEntity.password=mdPassword;
    messageEntity.save(function (err,userInfo){

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

