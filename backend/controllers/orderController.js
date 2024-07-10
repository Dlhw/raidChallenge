const Order = require('../models/orderModel')
const mongoose = require("mongoose")

// get all orders 
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({timestamps:1});
    res.status(200).json(orders);
}

// get a single order by userid
const getOrder = async(req,res) =>{
    const {id} = req.params

    const order = await Order.findOne({_id:id})
    
    if (!order){
        return res.status(400).json({error: "No such order"})
    }
    
    res.status(200).json(order);
}

// create new order
const createOrder = async (req, res)=>{
    try{
        const order = new Order({
            fulfilled:false,
            userid:req.body.userid,
            qty_price:req.body.qty_price,
            shipping_details:req.body.shipping_details,
            cartTotal:req.body.cartTotal
        })
    
        await order.save();
    
        res.status(200).json(order);
    }catch (err){
        console.log(err);
        res.status(400).json({error:err.message})
    }
   
}

// delete order
const deleteOrder = async (req, res) =>{

    const {id} = req.params
    const order = await Order.findOneAndDelete({_id:id})

    if (!order){
        return res.status(400).json({error:"No such order to Delete"})
    }

    res.status(200).json(order);
}

const updateOrder = async (req, res)=> {
    const {id} = req.params

    const order = await Order.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!order){
        return res.status(400).json({error:"No such order to update"})
    }

    res.status(200).json(order);
}

module.exports={
    createOrder,
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder
}