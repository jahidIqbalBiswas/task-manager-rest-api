const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const SendEmailUtility = require("../utilities/mailUtility")
const otpModel = require("../models/otpModel")
exports.registration = async (req,res) => {
    try{
        const reqBody = req.body
        await userModel.create(reqBody)
        res.json({status:"success",message:"Registration successful"})
    }
    catch(err){
        res.json({status:"failed",err})
    }
}
exports.login = async (req,res) => {
    try {
        const {email,password} = req.body
        const query = {email,password}
        const user = await userModel.find(query)
        if(user.length > 0){
            const payload = {
                exp:Math.floor(Date.now() / 1000 + (24 * 60 * 60)),
                data:email
            }
            const token = jwt.sign(payload,"secret123")
            res.json({status:"success",message:"User found",token})
        }else{
            res.json({status:"wrong",message:"Username or password is wrong."})
        }
    } catch (err) {
        res.json({status:"failed",err})
    };
}
exports.userProfile = async (req,res) => {
   try {
    const email = req.headers.email
    const projection = {password:0}
    const user = await userModel.find({email},projection)
    res.json({status:"success",userProfile:user})
   } catch (err) {
    res.json({status:"failed",err})
   }
}
exports.updateProfile = async (req,res) => {
    try {
        const email = req.headers.email
        const {firstName,lastName,mobile} = req.body
        const updateData = {firstName,lastName,mobile}
        await userModel.updateOne({email},updateData)
        res.json({status:"success",message:`User profile updated successfully`})
    } catch (err) {
    res.json({status:"failed",err})
    };
}
exports.verifyEmail = async (req,res) => {
    try {
        const email = req.params.email
        const user = await userModel.find({email})
        if(user.length > 0){
            const otp = Math.floor(1000000 + Math.random() * 9000000)
            await SendEmailUtility(email,`Your OTP: ${otp}`,`hello, email`)
            await otpModel.create({email,otp,status:"initial"})
            res.json({status:"success",message:"Email send success."})
        }else{
            res.json({status:"unknown mail address",message:"Your email address is not valid"})
        }
    } catch (err) {
        res.json({status:"failed",err})
    };
}
exports.verifyOtp = async (req,res) => {
    try {
        const {email,otp} = req.params
        const isValid = await otpModel.find({email,otp,status:"initial"})
        if(isValid.length > 0){
                await otpModel.updateOne({email,otp},{status:"verified"})
                res.json({status:"success",message:"Your email verified successfully."})
            
        }else{
        res.json({status:"failed",message:"Invalid OTP"})
        }
    } catch (err) {
        res.json({status:"failed",err})
       
    };
}
exports.resetPassword = async (req,res) => {
    try {
        const {email,otp,password} = req.params
        const isVerified = await otpModel.find({email,otp,status:"verified"})
        if(isVerified.length > 0){
            await otpModel.deleteOne({email,otp})
            await userModel.updateOne({email},{password})
            res.json({status:"success",message:"Password changed successfully."})
        }else{
            res.json({status:"not verified",message:"Your otp not verified."})
        }
    } catch (err) {
        res.json({status:"failed",err})
    }
}