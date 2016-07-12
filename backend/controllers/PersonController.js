/**
 * Created by fanjingdan on 5/9/2016.
 */
"use strict";

var config = require('../config');
var personDBModel = require('../models/person.js');
var crypt = require('../utils/crypt.js');
var Person =new personDBModel.Schema("person").model;
exports.create = function (req,res,next){
    var person = new Person();
    person.name = req.body.name;
    //var mdPassword=crypt.md5(req.body.password);
    //personEntity.password=mdPassword;
    person.save(function (err,personInfo){
        console.log("person saved"+personInfo);
        res.json(personInfo);
    });
};

exports.list=function(req, res, next){
    console.log("person list"+req+Person);
    Person.find({},function(err,personList){
        //res.render('./person/persons.html',{personList:personList});
        console.log("person list"+personList);
        res.json({});
    });

};

exports.personManager = function (req,res,next){

};

