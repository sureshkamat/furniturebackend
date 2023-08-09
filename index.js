const express=require('express');
const {connection}=require('./utils/db')
const cors=require('cors');
const {furnitureRoutes}=require('./routes/furniture.route');



const app=express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send({msg:"Furniture Base Url here "});
})






app.use("/furnitures",furnitureRoutes);



app.listen(5000,async ()=>{
    try{
        await connection;
        console.log("Database furniturebackend connected through Atlas");
    }
    catch(err){
        console.log("Error while connecting DataBase");
        console.log(err);
    }
    console.log("App is listening on port 5000");
})