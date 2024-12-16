const express = require('express')
const userRoute = require('./src/route/userRoute')
const TaskRouter = require('./src/route/Task')
require("dotenv").config()
const mongoose = require('mongoose')
const errorMiddleWare = require('./src/middleware/ErrorHandler')
const app = express()

app.use(express.json())


// define a basic route
app.get('/',(req,res)=>{
    res.send('welcome to express.js')
})
app.use("/api", userRoute)

app.use("/api/task", TaskRouter)

app.use(errorMiddleWare)


// start the server




const connectDB = async ()=>{
    const mongoUri = process.env.DB_URL

    if(!mongoUri){
        throw new Error('DB_URL is not defined in the environment variables')
    }
    try{
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error){
        console.error('MongoDB connection failed:', error);
        process.exit(1);
            //    exit process with failure
    }

};

connectDB()  

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})


// model 
// represents the data layer and business logic of the application. manages data, rules,
//  and logic , often interacting with the database. notifies the view of any updates in the data

// controller
// acts as the intermediary between the model and ViewTransition, handles user inputs, processes request 
// and updates the model or view accordingly.