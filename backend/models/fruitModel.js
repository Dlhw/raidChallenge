const mongoose = require("mongoose")

const Schema = mongoose.Schema

// defines the structure of fruit document
const fruitSchema = new Schema({
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },

}, {timestamps:true}) // additonal property of time of creation and last updated

const stockSchema = new Schema({
    stock:{
        type:Map,
        of: fruitSchema,
        required:true
    },
})
module.exports = mongoose.model("Fruit", stockSchema) // creates collection
