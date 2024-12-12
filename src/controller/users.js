const users = [
    {id:1 , name:"Alice"},
    {id:2 , name:"Grace"},
    {id:3 , name:"fortune"},
    {id:4 , name:"Mercy", password: 223},
]


// const getAllUsers = (req,res)=>{
//     res.status(200).json(users)
// }
// const loginUser = (req,res)=>{
//     const {name, password}=req.body
//     const user = users.find(user=>user.name===name)
    
//     if(!user){
//         return res.status(404).json({message:"user not found"})
//     }
//     if(user.password===parseInt(password, 10)){
//         return res.status(200).json({message:"Login Successful" ,user})
//     } else{
//         return res.status(401).json({message:"Invalid password"})
//     }
// }

// const registerUser = (req,res)=>{
//     const {email, password, name}=req.body
//     const existingUser = users.find(user=>user.name===name)
//     if(existingUser){
//         return res.status(400).json({message:"user already exist"})
//     } 
//     const newUser={
//         id: users.length+1,
//         name,
//         password,
//         email
//     }
//     users.push(newUser)
//     console.log(users)
//     return res.status(201).json({message:"user registered successfully"})
// }

// module.exports = {getAllUsers, loginUser, registerUser}

    const Users = require("../model/Registration")
    const bcrypt = require("bcrypt")
    const jwt = require("jsonwebtoken")
    const register = async(req,res)=>{
        
        const{firstName, lastName,email,phoneNumber, password}=req.body
        

        if(!firstName || !password) return res.status(400).send('All fields are required')
            // const userExists = users.find(user=>user.email === email)
        // const userExists = await Users.findOne({
        //     email:email
        // })
        // if(userExists) return res.status(400). send("user already exists")
            try{
            const hashedPassword = await bcrypt.hash(password,10)
            const user = new Users({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                phoneNumber
            })
            user.save()
            res.status(201).json({message:"success"})
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

const login = async(req,res)=>{
    const {email, password}=req.body
    if(!email||!password){
        return res.status(400).send("email and password are required")
    }
    try{
        const user = await Users.findOne({email})
        if(!user){
            return res.status(400).send("invalid email")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).send("invalid password")
        }
        // create a jwtoken
        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}

        )
        return res.status(200).json({message:"login successful", token})
    } catch(error){
        return res.status(500).send({message:error.message})
    }

    
}
const all = async (req,res)=>{
    try{
        const all = await Users.find();
        res.status(200).json
    } catch(error){
        res.status(500).json({message:'error retrieving users'})
    }
}

const singleUser = async (req,res)=>{
    const userId = req.params.id
    try{
        const user = await user.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message:"error retrieving user",error:error.message});
    } 
}

module.exports={register, login, all, singleUser}


