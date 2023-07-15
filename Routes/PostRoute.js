
const express = require('express');
const Post = require('../Model/PostModel')
const jwt = require('jsonwebtoken')
const blacklist = require('../blacklist');
const auth = require('../Middleware/auth');
const prouter = express.Router()

// post
prouter.post('/add',auth,async(req,res)=>{
        try {
            const post = await Post.create({...req.body,creator:req.userId,name:req.name})

            await post.populate('creator')
       
            res.send({msg:"Successfully added",post:post})   
        } catch (error) {
            res.send(error)
        }
    
    
}) 

// get
prouter.get('/',async(req,res)=>{
       try {
       
         const post = await Post.find()
         res.send(post)
       } catch (error) {
        res.send(error)
       } 
    
})

// search 

prouter.get('/search',async(req,res)=>{
     try {
        const {q} = req.query;
    const title = new RegExp(q,'i')
    const post = await Post.find({title})
    res.send(post)
     } catch (error) {
        res.send(error)
     }
    

})

// update

prouter.patch('/update/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
         
           if(post.creator.toString()!==req.userId){
              res.send('You are not allowed to Update')
           }

           const newpost = await Post.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
           res.send({msg:"Successfully Updated",newpost:newpost})
    } catch (error) {
        res.send(error)
    }


})

/// like 
prouter.patch('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
              
              const index =   post.liks.findIndex(ele =>ele == String(req.userId))
              
              if(index==-1){
                  post.liks.push(String(req.userId))
              }
              else{
                post.liks = post.liks.filter(ele=> ele !== String(req.userId))
              }

           const newpost = await Post.findByIdAndUpdate({_id:req.params.id},post,{new:true})
           res.send({msg:"Successfully Updated",newpost:newpost})
    } catch (error) {
        res.send("error")
    }
 

})

//delete 

prouter.delete('/delete/:id',auth,async(req,res)=>{
    try {
        console.log('ldflfalfd')
        const post = await Post.findById(req.params.id)
         
           if(post.creator.toString()!==req.userId){
              res.send('You are not allowed to Update')
           }

            await Post.findByIdAndRemove({_id:req.params.id})
           res.send({msg:"Successfully Deleted"})
    } catch (error) {
        res.send(error)
    }


})

module.exports = prouter;

