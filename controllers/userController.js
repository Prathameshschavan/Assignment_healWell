const { validationResult } = require("express-validator")
const db = require("../models")
const bcrypt = require('bcrypt');
const { json } = require("sequelize");
const User = db.users
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();



// Create a new User
   const register = async (req,res)=>{
    try {
          const exist = await User.findOne({where:{email:req.body.email}});

          if(exist){
            res.status(409).json({message:"User already exists"});
          }

          let obj ={
            name:req.body.name,
            email:req.body.email,
            password:hashing(req.body.password)
          }
           const user = await User.create(obj);
           let final = user.toJSON()
           delete final.password;

           res.status(200).send(final);
    } catch (error) {
         console.log(error)
         res.status(500).send({error})
    }
   }
  

// Login User
   const Login = async (req,res)=>{

    try {
         const exist = await User.findOne({where:{email:req.body.email}});

          if(!exist){
            res.status(404).json({message:"User Does Not Exists"});
          } 

          let hashed = hashing(req.body.password);
                console.log(exist)
          if(hashed!==exist.password){
            console.log(hashed,exist.password)
            res.status(401).json({message:"User password does not match"});
          }
          
          let final = exist.toJSON();
          delete final.password;
          let token = genrateToken(final);
    
           res.status(200).json({
            token,
            user:final 
           });
    } catch (error) { 
         console.log(error)
         res.status(500).send({error});
    }
   }

// Hashing the password
   const hashing = (password)=>{
    let hashed= bcrypt.hashSync(password, '$2b$10$1234567890123456789012');
    // console.log("hashed: " + hashed)
    return hashed;
   }

//  Generating the Token
   const genrateToken =(payload)=>{
    let token = jwt.sign(payload,process.env.SCECRET_TOKEN)
    return token;
   }

// Verifying the Token
   function  Verify(token,res){

    try {
      let user =  jwt.verify(token,process.env.SCECRET_TOKEN);
       return user;
      
    } catch (error) {
       return error;
    }
    
  }

   module.exports= {register,Login,hashing,Verify}  