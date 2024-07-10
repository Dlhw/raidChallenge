const mongoose = require("mongoose");

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

// defines the structure of fruit document
const cartSchema = new Schema({
    userid:{
        type:String,
        required:true,
        unique:true
    },
    qty_price:{
        type:Map,
        of: qtyCostSchema,
        required:true
    },

}, {timestamps:true}); // additonal property of time of creation and last updated

const Cart = mongoose.model("Cart", cartSchema);

module.exports = {Cart, qtyCostSchema}; // creates collection
