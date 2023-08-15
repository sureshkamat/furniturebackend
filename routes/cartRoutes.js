const {Router} =require('express');
const {CartModel}=require('../models/cart.model')
const {UserModel} =require('../models/userss.model')

const cartRoutes=Router();
cartRoutes.get("/",async (req,res)=>{
    const author_id=req.user_id;
    console.log(author_id);
    const cart=await CartModel.find({userid:author_id});
    res.send(cart);
})
cartRoutes.get("/all",async (req,res)=>{
    const cart=await CartModel.find();
    res.send(cart);
})

cartRoutes.post("/",async (req,res)=>{
    const {name,price,category,company,image}=req.body;
    const author_id=req.user_id;
    const user=await UserModel.findOne({_id:author_id});
    
    const new_blog=new CartModel({
        name,
        price,
        company,
        category,
        image,
        userid:author_id,
        email:user.email
    })
    await new_blog.save();
    res.send({msg:"Product Added to Cart",data:new_blog});

})


cartRoutes.delete("/:id",async (req,res)=>{
    const id=req.params.id;
    await CartModel.findByIdAndDelete({_id:id});
    res.send({msg:"Product Deleted from cart"});

})



module.exports={cartRoutes};