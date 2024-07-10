const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const qtyCostSchema = new Schema({
    qty: {
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}, { _id: false });

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Map,
        of: qtyCostSchema,
    },
    role:{
        type:Number,
        required:true
    }

}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);