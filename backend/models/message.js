/**
 * Created by fanjingdan on 5/8/2016.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var messageScheme = new Schema({
    to_person:String
    ,from_person:String
    ,content:String
    ,create_date: { type: Date, default: Date.now }
    ,send_status:String
});
mongoose.model('message', messageScheme);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
};
