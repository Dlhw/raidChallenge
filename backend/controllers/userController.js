const User = require('../models/userModel')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');



// register user
const regUser = async (req,res) => {

    let check = await User.findOne({email:req.body.email});
    //if user is found, throw error
    if (check){
        return res.status(400).json({success:false,error:"Existing User Found with same email address"})
    }
    let cart = {};
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
        role:2
    })

    const data = {
        user:{
            role: user.role,
            id:user.id,
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET||"someSecret");

    await user.save();
    
    res.json({success:true,token})
}

// login user
const loginUser = async (req,res) => {
    
    let user = await User.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password == user.password;
        if (passCompare){
            const data ={
                user:{
                    role: user.role,
                    id:user.id,
                }
            }
            const token = jwt.sign(data,process.env.JWT_SECRET||"someSecret");
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"Wrong Email or Password"});
        }
    }
    else{
        res.json({success:false, error:"Wrong Email or Password"})
    }
}


module.exports = {
   regUser,
   loginUser
}