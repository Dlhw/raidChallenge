const {qtyCostSchema} = require('./cartModel');

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fulfilled:{
        type:Boolean,
        required:true
    },
    userid:{
        type:String,
        required:true,
    },
    qty_price:{
        type:Map,
        of: qtyCostSchema,
        required:true
    },
    shipping_details:{
        type:String,
    },
    cartTotal:{
        type:Number,
        required:true
    }
}, {timestamps:true});

module.exports = mongoose.model("Order", orderSchema);