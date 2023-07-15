
const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const blacklist = require('../blacklist')
const router = express.Router()

router.post('/register',async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const newPassword = await bcrypt.hash(password,10)
        const user = await User.create({...req.body,password:newPassword})
        
        res.send({
            msg:"Successfully registerd",
            user:user
        })
    } catch (error) {
        res.send(error)
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            res.send({msg:"Sign Up first"})
        }
        const varify = bcrypt.compare(user.password,password)
        if(!varify){
            res.send({msg:"Password is worng"})
        }
        console.log(user)
     const token =   jwt.sign({
            userId:user._id,username:user.username
          }, 'secret', { expiresIn: '1h' });
         
        res.send({
            msg:"login success",
            token:token
        })
    
    } catch (error) {
        res.send(error)
    }
})

router.get('/logout',async(req,res)=>{
    try {

        const token = req.headers.authorization?.split(' ')[1]
        if(!token)
        {
            res.send('Login first')
        }
        
        
        blacklist.push(token)
        res.send('You have logged out')
    } catch (error) {
        res.send({msg:"error",
        error:error})
    }
   
})

module.exports = router


// raja ji
// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/wtrewa/crud-app.git
// git push -u origin main

// git remote add origin https://github.com/wtrewa/crud-app.git
// git branch -M main
// git push -u origin main
// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/wtrewa/Random.git
// git push -u origin main