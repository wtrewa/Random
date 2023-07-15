const { default: mongoose } = require("mongoose")


const connect = async()=>{
     try{
        
           await mongoose.connect(process.env.DATABASE)
           console.log('connection has built')
     }
     catch(err){
       console.log(err)
     }
}

module.exports = connect