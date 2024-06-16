const { Router } = require("express");
const { handleLogin, handleSignup,forgetPassword,changePassword } = require("../controllers/user");


const userRouter = Router();

userRouter.post("/login",  handleLogin)
userRouter.post("/register", handleSignup)
userRouter.post("/forgetpassword", forgetPassword) // need to work on it
userRouter.post("/changepassword", changePassword) // need to work on it

module.exports = { userRouter }