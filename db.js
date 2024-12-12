const mongoose = require('mongoose')



const connectDB = async ()=>{
    const mongoUri = "mongodb+srv://dafezy1:1JqAnnNpK54mZyuN@cluster0.gbsm7.mongodb.net/"

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

module.exports = connectDB;  