// Basic library import
const express = require("express")
const router = require("./src/routes/api")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const helmet = require("helmet")
const mongoose = require("mongoose")
const app = express()
// Middlewares implement
// Cross Origin enable
app.use(cors())
// Security implementation
app.use(helmet())
app.use(hpp())
app.use(express.json({limit:"20mb"}))
app.use(express.urlencoded({extended:true}))
const limiter = rateLimit({
    windowMs: (15 * 60) * 1000,
    limit: 50
})
app.use(limiter)
//MongoDB Connection
const URL = "mongodb+srv://jahidbiswas:jahidbiswas@cluster0.cgs1psp.mongodb.net/task-manager"
const OPTIONS = {user:"",pass:"",autoIndex:true}
mongoose.connect(URL,OPTIONS).then((res) => {
    console.log("Database Connected.");
}).catch((err) => {
    console.log(err);
})
// Route implement
app.use("/api",router)
// 404 Routes
app.use("*",(req,res) => {
    res.status(404).json({status:"Not Found",message:"Your request url is not valid."})
})

module.exports = app