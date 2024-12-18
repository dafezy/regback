const express = require("express")
const { createTask, getSingleTask, updateTask, deleteTask, getTask } = require("../controller/Task")
const { authenticationToken } = require("../middleware/Jwt")
const router = express.Router()

router.post("/create", createTask)
router.get("/singleTask/:id", getSingleTask)
router.put("/updateTask/:id", updateTask)   
router.delete("/deleteTask/:id", deleteTask) 
router.get("/get", getTask)


module.exports= router