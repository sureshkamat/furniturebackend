const mongoose=require('mongoose');

const furnitureSchema=new mongoose.Schema({
    name:String,
    price:Number,
    company:String,
    category:String,
    description:String,
    image:[String]
})

const  FurnitureModel=mongoose.model('furnitures',furnitureSchema);
module.exports={FurnitureModel};