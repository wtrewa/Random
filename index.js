
const express = require('express')
const connect= require('./Mongoose/mongoose');
const router = require('./Routes/UserRoute');
const prouter = require("./Routes/PostRoute")
const auth = require('./Middleware/auth');
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())
app.use('/user',router)
app.use('/post',prouter)



app.get('/',(req,res)=>{
    
    res.send('WelCome To Home Route')
})




app.listen(process.env.PORT,()=>{
 
    connect()
    console.log("server is running on port 8080")
})
