const {Router} =require('express');
const {FurnitureModel}=require('../models/furniture.model')


const furnitureRoutes=Router();

//post furniture Create
furnitureRoutes.post("/add",async (req,res)=>{
    try{
        const {name,price,company,category,description,image,stock}=req.body;
    const new_furniture=new FurnitureModel({
        name,
        price,
        company,
        category,
        description,
        image,
        stock
    })
    await new_furniture.save();
    res.send({msg:"New Furniture added",furniture:new_furniture});
    }
    catch(err){
        res.send({msg:"Error while adding new Furniture",error:err})
    }
})


//get All furniture Read All
furnitureRoutes.get("/",async (req,res)=>{
    try{
        const {category,company,sort,search,page,limit}=req.query;
        const query={};
        if(category) query.category=category;
        if(company) query.company=company;
        if(search) {
            const searchQuery=new RegExp(search,'i');
            query.$or=[
                {name:searchQuery },
                {description:searchQuery},
                {category:searchQuery},
                {company:searchQuery}
            ];
        }
        const totalCount=await FurnitureModel.countDocuments(query);
        const sortOptions={}
        if(sort==='asc'){
            sortOptions.price=1
        }
        if(sort==='desc'){
            sortOptions.price=-1
        }
        const pageSize=limit;
        
        const skip=(page-1)*pageSize;
        console.log(limit);
        const data=await FurnitureModel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        res.json({
            total:totalCount,
            page,
            limit:pageSize,
            data
        })
    }
    catch(err){
        res.send({msg:"Error while Fetching All Furnitures",error:err});
    }
});

//get Single Fiurniture Details Read Single Data
furnitureRoutes.get("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const data=await FurnitureModel.find({_id:id});
         res.send({data:data});
    }
    catch(err){
        res.send({msg:"Error while Single Furnitures Data",error:err});
    }
});


//Update Furniture Details U
furnitureRoutes.put("/edit/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const payload=req.body;
        await FurnitureModel.findByIdAndUpdate(id,payload);
        res.send({data:`Furniture Id ${id} is Updated with new Data`});
    }
    catch(err){
        res.send({msg:"Error while Updating Single Furnitures Data",error:err});
    }
});


//Delete Furniture Details U
furnitureRoutes.delete("/delete/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        await FurnitureModel.findByIdAndDelete(id);
        res.send({data:`Furniture Id ${id} is Deleted`});
    }
    catch(err){
        res.send({msg:"Error while Deleting Single Furnitures Data",error:err});
    }
});





module.exports={furnitureRoutes};
