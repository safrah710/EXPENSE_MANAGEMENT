import { client,dbname1 } from "../Model/index.js";
import Auth from "../Auth.js";
const add=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let{name,expenseName,expenseType,amount,month,year}=req.body;
        await db.collection('expense').insertOne({name,expenseName,expenseType,amount,month,year});
        res.status(200).send({
            message:"Data added successfully"
        })
    }
    catch(err){
        res.status(400).send({
            message:"Data not added successfully"
        })
    }
}
 const get=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let {name,year,month,expenseType}=req.query;
        let payload=await db.collection('expense').find({name,year,month,expenseType}).toArray();
        res.status(200).send({
            message:"data fetched",
            data:payload
        }); 
    }
    catch(err){
        res.status(400).send({
            message:"not fetched"
        })
    }
 }

 const get1=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let {name}=req.query;
        let payload=await db.collection('expense').find({name},{projection:{amount:1}}).toArray();
        res.status(200).send({
            message:"data fetched",
            data:payload
        }); 
    }
    catch(err){
        res.status(400).send({
            message:"not fetched"
        })
    }
 }
 const get2=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let {name,month,year}=req.query;
        let payload=await db.collection('expense').find({name,year,month},{projection:{amount:1}}).toArray();
        res.status(200).send({
            message:"data fetched",
            data:payload
        }); 
    }
    catch(err){
        res.status(400).send({
            message:"not fetched"
        })
    }
 }
 const get3=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let {name,month,year}=req.query;
       
        let payload=await db.collection('expense').find({name,year,month},{projection:{amount:1,expenseType:1}}).toArray();
        console.log(payload)
        res.status(200).send({
            message:"data fetched",
            data:payload
        }); 
    }
    catch(err){
        res.status(400).send({
            message:"not fetched"
        })
    }
 }
 const get4=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1);
        let {name}=req.query;
       
        let payload=await db.collection('expense').find({expenseType:name},{projection:{expenseName:1,amount:1}}).toArray();
        console.log(payload)
        res.status(200).send({
            message:"data fetched",
            data:payload
        }); 
    }
    catch(err){
        res.status(400).send({
            message:"not fetched"
        })
    }
 }
 const delete1=async(req,res)=>{
     await client.connect();
     try{
        let db=client.db(dbname1);
        let {expenseName}=req.query;
        await db.collection('expense').deleteOne({expenseName});
        res.status(200).send({
            message:"Data deleted"
        })

     }
     catch(err){
        res.status(400).send({
            message:"Data  deletion unsuccessfull"
        })
     }
 }
 const delete2=async(req,res)=>{
    await client.connect();
    try{
       let db=client.db(dbname1);
       let {name}=req.query;
       await db.collection('expense').deleteMany({name});
       res.status(200).send({
           message:"Data deleted"
       })

    }
    catch(err){
       res.status(400).send({
           message:"Data  deletion unsuccessfull"
       })
    }
}

export default{add,get,delete1,get1,get2,delete2,get3,get4};