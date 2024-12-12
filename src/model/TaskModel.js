const mongoose= require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags: {
        type:String,
        enum: ['urgent', 'important']
    }

})

module.exports = mongoose.model('Task', TaskSchema)