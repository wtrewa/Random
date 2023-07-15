
const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    liks:{type:[String],default:[]},
    comment:{type:[String],default:[]},
    tags:[]
})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel;