const express = require("express")
const { getAllUsers, loginUser, registerUser, register, login, singleUser, all } = require("../controller/users")
const { createTask, getTask } = require("../controller/Task")
const router = express.Router()



// router.get("/users", getAllUsers)
// router.post("/login",loginUser)
// router.put("/register",registerUser)
// router.post("/Task",createTask)
// router.get("/getTask", getTask)
router.post("/reg", register)
router.post("/log",login)
router.get("/allu", all)
router.get("/single",singleUser)

module.exports = router