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