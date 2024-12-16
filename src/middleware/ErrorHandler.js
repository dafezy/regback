const express = require('express')
const app = express()

// app.use((err, req,res,next)=>{
//     console.error(err.stack)
//     res.status(500).send({error:"something went wrong"})
// })

const errorMiddleWare = ((err, req,res,next)=>{
    console.error(err.stack)
    res.status(err.statusCode || 500).json({
        error:err.message || 'internal server error'
    })
})

module.exports = errorMiddleWare
