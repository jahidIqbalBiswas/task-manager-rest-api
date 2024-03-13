const taskModel = require("../models/taskModel")
exports.create = async (req,res) => {
    try {
        const email = req.headers.email
        const {title,desc} = req.body
        const taskInfo = {email,title,desc,status:"new"}
        await taskModel.create(taskInfo)
        res.json({status:"success",message:"Task added successfully."})
    } catch (err) {
        res.json({status:"failed",err})
    };
}
exports.show = async (req,res) => {
    try {
        const email = req.headers.email
        const data = await taskModel.find({email})
        res.json({status:"success",data})
    } catch (err) {
        res.json({status:"failed",err})
    };
    
}
exports.update = async (req,res) => {
    try {
        const email = req.headers.email
        const id = req.params.id
        const {title,desc} = req.body
        const data = await taskModel.updateOne({email,_id:id},{title,desc})
        if(data.matchedCount > 0){
            res.json({status:"success",message:"Task updated successfully."})
        }else{
            res.json({status:"fail",message:"You can't update this task."})
        }
    } catch (err) {
        res.json({status:"failed",err})
    };
    
}
exports.updateStatus = async (req,res) => {
    try {
        const email = req.headers.email
        const id = req.params.id
        const {status} = req.body
        const data = await taskModel.updateOne({email,_id:id},{status})
        if(data.matchedCount > 0){
            res.json({status:"success",message:"Task status updated successfully."})
        }else{
            res.json({status:"fail",message:"You can't update this task status."})
        }
    } catch (err) {
        res.json({status:"failed",err})
    };
    
}
exports.filterByStatus = async (req,res) => {
    try {
        const email = req.headers.email
        const status = req.params.status
        const data = await taskModel.find({email,status})
        res.json({status:"success",message:`Filtered by status:${status}.`,data})
    } catch (err) {
        res.json({status:"failed",err})
    };
}
exports.delete = async (req,res) => {
    try {
        const email = req.headers.email
        const id = req.params.id
        const data = await taskModel.deleteOne({email,_id:id})
        if(data.deletedCount > 0){
            res.json({status:"success",message:"Task deleted successfully."})
        }else{
        res.json({status:"fail",message:"Task not found."})
        }
    } catch (err) {
        res.json({status:"failed",err})
    };
}