/**
 * Created by I312177 on 5/9/2016.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var personSchema = new Schema({
    name:String,
    password:String,
    email:String,
    create_date: { type: Date, default: Date.now }
});

mongoose.model('person', personSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
