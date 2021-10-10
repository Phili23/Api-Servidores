import express from 'express';
//importar Monggot para conectar nuestr base de datos para
import mongoose from "mongoose"
import store from './api/models/store.js';


 //const express = required('express');///es igual a lo anterior

///configurara el servidor

const app=express();
const port = 5500

const mongoURL="mongodb+srv://JvascrriptDeNoobAPro:<test123>@cluster0.ptta7.mongodb.net/clients?retrywrites=true&w=majority"
mongoose.connect(mongoURL,{useNewUrlParser: true, useUnifiendTopology: true})//useNewUrlParser el analizador de cadenas va a ser actualizado

//aqui el middleware, 50mb ..por cantidad de la base datos..admita una bd grande
app.use(express.json({limit:"50mb"}))

//agregando lo podemos ver en postman, para crear un endpoint con psot
app.post('/api/clients',(req,res)=>{
   let clientData=req.body
   let mongoRecords=[]
   clientData.forEach(client=>{
       mongoRecords.push({
           firstName:client.firstName,
           phone:client.phone,
           address:client.address,
        })
   })
    store.create(mongoRecords,(err,records)=>{
        if(err) {
            res.status(500).send(err)
        }else {
            res.status(200).send(records)
        }
    })
})
app.delete('/api/clients',(req,res)=>{
store.deletManny({},(err)=>{
    res.status(500).send(err)
})

app.get("/api/clients", (req,res)=>{
    store.find({},(err,docs)=>{
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
        
    })
})
})


app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
})