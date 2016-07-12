/**
 * Created by fanjingdan on 5/9/2016.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var personSchema = new Schema({
	_id:Schema.Types.ObjectId, 
    name:String,
    gender:String,
    height:Number,
    birthday:{ type: Date},
    address:String,
    province:String,
    house_situation:String,
    degree:String,
    job_description:String,
    job:String,
    income:Number,
    marriage:String,
    avatar:String,
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date}
});

mongoose.model('person', personSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
