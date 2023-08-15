const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    name:String,
    price:Number,
    company:String,
    category:String,
    image:[String],
    userid:String,
    email:String
})

const  CartModel=mongoose.model('carts',CartSchema);
module.exports={CartModel};