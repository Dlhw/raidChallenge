// attach env variables to the global process object
require("dotenv").config();
//pakages
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//routes
const fruitstoreRoutes = require("./routes/fruitstoreRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

//models
const Fruit = require('./models/fruitModel');
const User = require('./models/userModel');

//seeds
const seedFruits = require('./seed/fruits');
const seedUser = require('./seed/adminUser');



// express app
const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/raid"

// global middleware
app.use(express.json()) // this lines check for body content from request and passes it to request object
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/cart',cartRoutes);
app.use('/api/fruitstore',fruitstoreRoutes);
app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes)

app.post("/api/verifyToken",(req,res)=>{
    const token = req.body.token;
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET||"someSecret");
        res.json({valid:true, decoded});
    } catch (err){
        res.json({valid:false, error:err.message});
    }
});

// connect to mongodb
mongoose.connect(MONGO_URI)
    .then( async()=>{
        const count = await Fruit.countDocuments({})
        const count2 = await User.findOne({username:"owner"})
        if (count === 0){
            //seeding
            const docs = await Fruit.insertMany(seedFruits);
        }
        if (count2 === null){
            //seeding
            const user = new User(seedUser);
            await user.save();
        }
        // listen for requests
        app.listen(PORT, ()=>{
            console.log(`connected to db and listening on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err);
    })

