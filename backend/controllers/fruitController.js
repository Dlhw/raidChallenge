const Fruit = require('../models/fruitModel')
const mongoose = require("mongoose")

// get all fruits
const getFruits = async (req,res) => {
    const fruits = await Fruit.find({}).sort({name: 1});
    res.status(200).json(fruits);
}

// get a single fruit
const getFruit = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid ID"})
    }

    const fruit = await Fruit.findById(id)
    
    if (!fruit){
        return res.status(400).json({error: "No such fruit"})
    }
    
    res.status(200).json(fruit)
}


// create new fruit
const createFruit = async (req, res) => {
    const {name,price,stock} = req.body
    // add doc to db
    try{
        const fruit = await Fruit.create({name,price,stock})
        res.status(200).json(fruit)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// delete a fruit
const deleteFruit = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid ID"}) 
    }

    const fruit = await Fruit.findOneAndDelete({_id:id})

    if(!fruit){
        return res.status(400).json({error: "No such fruit"})
    }

    res.status(200).json(fruit)

}

// update a fruit

const updateFruit = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID'})
    }

    const fruit = await Fruit.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if (!fruit){
        return res.status(400).json({error:"No such fruit"})
    }

    res.status(200).json(fruit)
}

module.exports = {
    createFruit,
    getFruit,
    getFruits,
    deleteFruit,
    updateFruit
}