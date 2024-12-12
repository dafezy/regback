const authenticationToken = (req,res,next)=>{
    const token = req.headers("Authorization")
    if(!token)
        return res.status(401).send("access denied")
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user=verified
        next()
    } catch(error){
        res.status(400).send("invalid token")
    }
}
module.exports = {
    authenticationToken
}