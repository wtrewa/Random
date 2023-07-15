const jwt = require('jsonwebtoken')
const blacklist = require('../blacklist')


const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
         
        if(blacklist.includes(token)){
            res.send('session has expired')
        }
        else{
            const decoded =  jwt.verify(token,'secret')
      
       if(!decoded){
        res.send("invalid token")
      }
         req.userId = decoded.userId;
         req.name = decoded.username
         
         next()
        }
       
      
    } catch (error) {
        res.send(error)
    }
      
}
module.exports = auth;