const Task = require('../model/TaskModel')

const createTask = async(req,res)=>{
    try{
        const {title, description, tags} = req.body
        const task = await Task.create(req.body)
        res.status(201).json({task})

    }catch(error){
        console.error('Error creating task:',error)
        res.status(500).json({message:error})

    }
}
const getTask = async(req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch(error){
        res.status(500).json({message:error})
    }
}
const getSingleTask= async (req,res)=>{
    try{
    const id = req.params.id
    const task = await Task.findOne({_id:id})
    if(!task){
        return res.status(404).json({message:`no task with id:${id}`})
    }
    res.status(200).json({task})
    } catch(error){
        res.status(500).json({message:error})
    }
}
const updateTask = async (req,res)=>{
    try{
    const id = req.params.id
    const task = await Task.findOneAndUpdate({_id:id}, req.body,{new:true})
    if(!task){
        return res.status(404).json({message:`no task with id:${id}`})
    }
    res.status(200).json({task})
    } catch(error){
        res.status(500).json({message:error})
    }
}
const deleteTask = async (req,res)=>{
    try{
    const id = req.params.id
    const task = await Task.findByIdAndDelete({_id:id}, req.body)
    if(!task){
        return res.status(404).json({message:`no task with id:${id}`})
    }
    res.status(200).json({task})
    } catch(error){
        res.status(500).json({message:error})

    }
}
    module.exports ={createTask, getTask, getSingleTask, updateTask, deleteTask}