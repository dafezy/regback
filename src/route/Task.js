const express = require("express")
const { createTask, getSingleTask, updateTask, deleteTask } = require("../controller/Task")
const router = express.Router()

router.post("/create", createTask)
router.get("/singleTask/:id", getSingleTask)
router.put("/updateTask/:id", updateTask)
router.delete("/deleteTask/:id", deleteTask)


module.exports= router