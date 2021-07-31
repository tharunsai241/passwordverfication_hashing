

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv=require("dotenv");
const bcrypt =require('bcrypt');

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const users = [];

app.get('/users',(req, res) => {
  res.json(users)
  
});

app.post('/users',async(req,res) =>{
    try{
        //const salt=await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //console.log(salt)
        console.log(hashedPassword);
         const user = {name: req.body.name, password:hashedPassword}
    users.push(user)
    res.status(201).send();
    //bcrypt.hash(salt+'password')
        }catch{
            res.status(500).send()
        }
   
})

app.post('/users/login',async(req,res)=>{
    const user=users.find(user=>user.name===req.body.name)
    if(user==null){
        return res.status(400).send('cannot find')
    }
    try{
       if(await bcrypt.compare(req.body.password, user.password))
       {
           res.send('Success')
       }
       else{
           res.send('not allowed');
        }
      }
    catch{
        res.status(500).send()
        }
})
app.listen(5000);
