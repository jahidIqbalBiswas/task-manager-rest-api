const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    mobile: {type:String,required:true},
    password: {type:String,required:true}
},{timestamps:true,versionKey:false})
const userModel = mongoose.model("users",dataSchema)
module.exports = userModel