const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const register = require('./modal');
const middleware = require('./middleware');
const app = express();


app.use(cors({origin:"*"}));
app.use(express.json());


const mongoUrl = 'mongodb+srv://chandra123:chandra123@cluster0.fnoyvit.mongodb.net/APRDC?retryWrites=true&w=majority';

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

 app.get('/random',(req,res)=>{
    return res.send("hello world")
 })   

app.post('/registration',async(req,res)=>{
    
     try {
     
        
        const {fname , lname , email , password , confirmPassword , phone , location}=req.body;
         
          let userExist = await register.findOne({email});
          if(userExist){
            return res.status(400).send("User Already Exists");
            
          }
          if(password !== confirmPassword)
          {
            return res.status(400).send("Password did not match");
            
          }
         const newUser = new register({
            fname,
            lname,
            email,
            password,
            phone,
            location
         })
         await newUser.save();
         return res.status(200).send("Registration Success");

     } catch (error) {
        return res.status(400).send("Internal Server Error");
     }
})

app.post('/login', async(req,res)=>{
     const {email,password} = req.body;
    try {
        const userExist = await register.findOne({email});
        if(!userExist)
        {
            return res.status(400).send("User Not Found")
        }
        if(userExist.password !== password)
        {
            return res.status(400).send("Password Incorrect")
        }
 
        const payload = {
            user:{
                id:userExist.id
            }
        }

       jwt.sign(payload,'secretkey',{expiresIn:260000},
       (err,token)=>{
           if (err) throw err;
           return res.json({token})
       })
        
    } catch (error) {
        return res.status(400).send("Internal Server Error");
    }
})


app.get('/myprofile' , middleware , async(req,res)=>{
    try {
         let user = await register.findById(req.user.id);
        if(!user){
            return res.status(400).send("User Details Not Found")
        }   
        res.json(user)                
    } catch (error) {
        return res.status(400).send("Internal Error")
    }
})

app.listen(5000,()=>{
    console.log("server listening");
})