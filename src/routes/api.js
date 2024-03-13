const router = require("express").Router()
const userController = require("../controllers/userController")
const taskController = require("../controllers/taskController")
const authMiddleware = require("../middlewares/authMiddleware")


// Login Registration
router.post("/registration",userController.registration)
router.post("/login",userController.login)
// Verification and Reset Password
router.get("/verify-email/:email",userController.verifyEmail)
router.get("/verify-otp/:email/:otp",userController.verifyOtp)
router.get("/reset-password/:email/:otp/:password",userController.resetPassword)
// After Login functionalities
router.get("/profile",authMiddleware,userController.userProfile)
router.post("/update-profile/:email",authMiddleware,userController.updateProfile)
//Task Operations
router.post("/task/create",authMiddleware,taskController.create)
router.get("/task/show",authMiddleware,taskController.show)
router.put("/task/update/:id",authMiddleware,taskController.update)
router.put("/task/update/status/:id",authMiddleware,taskController.updateStatus)
router.get("/task/filter/status/:status",authMiddleware,taskController.filterByStatus)
router.delete("/task/delete/:id",authMiddleware,taskController.delete)


module.exports = router