const jwt = require("jsonwebtoken")
module.exports = (req,res,next) => {
    const token = req.headers.token
    jwt.verify(token,"secret123",(err,success) => {
        if(err){
            res.status(401).json({status:"unauthorized"})
        }else{
            req.headers.email = success.data
            next()
        }
    })
}