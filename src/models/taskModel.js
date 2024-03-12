const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    email: {type:String,required:true},
    title: {type:String,required:true},
    desc: {type:String,required:true},
    status: {type:String,required:true}
},{timestamps:true,versionKey:false})
const taskModel = mongoose.model("tasks",dataSchema)
module.exports = taskModel