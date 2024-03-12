const router = require("express").Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")



router.post("/registration",userController.registration)
router.post("/login",userController.login)
router.get("/profile",authMiddleware,userController.userProfile)
router.post("/update-profile/:email",authMiddleware,userController.updateProfile)
router.get("/verify-email/:email",userController.verifyEmail)
router.get("/verify-otp/:email/:otp",userController.verifyOtp)
router.post("/reset-password/:email/:otp/:password",userController.resetPassword)

module.exports = router