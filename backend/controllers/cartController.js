const {Cart} = require('../models/cartModel')
const mongoose = require("mongoose")

// get a single cart
const getCart = async(req,res) =>{
    const {userid} = req.params

    const cart =  await Cart.findOne({ userid: userid }).exec();
    
    if (!cart){
        return res.status(400).json({success:false,error: `No such cart for ${userid}`})
    }
    
    res.status(200).json({success:true,cart:cart});
}


// create new cart
const createCart = async (req, res) => {
    const {userid,qty_price} = req.body
    // add doc to db
    try{
        const cart = await Cart.create({userid,qty_price})
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// delete a cart
const deleteCart = async (req, res) => {
    const {userid} = req.params

    const cart = await Cart.findOneAndDelete({userid:userid})

    if(!cart){
        return res.status(400).json({error: `No such cart for ${userid}`})
    }

    res.status(200).json(cart)

}

// update a cart

const updateCart = async (req,res) => {
    const {userid} = req.params

    const cart = await Cart.findOneAndUpdate({userid:userid}, {
        ...req.body
    })

    if (!cart){
        return res.status(400).json({error: `No such cart for ${userid}`})
    }

    res.status(200).json(cart)
}

module.exports = {
    createCart,
    getCart,
    deleteCart,
    updateCart
}