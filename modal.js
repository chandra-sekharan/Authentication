const mongoose = require('mongoose')

const schema = new mongoose.Schema({
 
    fname:{
        type:String,
        required:true,

    },
    lname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    datecreated:Date,
    dateupdated:Date
})



const register = new mongoose.model("register",schema)

module.exports = register