const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {Users}=require("../models");
const {sign}=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
router.get("/", async (req, res)=>{
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers);
});
router.post("/", async (req, res)=>{
    const user=req.body;
    if(req.body.username == "admin")
    {
        req.body.access="admin";
    }
    else{
        req.body.access="user";
    }
    const emailExists = await Users.findOne({ where: {emailid: req.body.emailid} });
    const usernameExists = await Users.findOne({ where: {username: req.body.username} });
    if (emailExists ) {
      res.json("Email already registered")
    }
    else if (usernameExists ) {
      res.json("Username already taken")
    }
    else{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
    req.body.password=hashedPassword;
    await Users.create(user);
    console.log(req.body.username);
    res.json("SUCCESS!");
    }
    
});
router.post("/login", async (req, res)=>{
    const { username, password} = req.body;
    const user = await Users.findOne({ where: {username: username}});
    if(!user)
    {
        res.json({error: "No such user exists in the database"});
    }
    else{
        const accessToken=sign({username: user.username, id: user.id}, "72564A672EBAC906DACECA4DD53E82A4C7D8570F821B0E917CD7A701BDF6A5CA")
        bcrypt.compare(password, user.password).then((match)=>{
            if(!match) {
                res.json({error: "wrong username/password"});}
            else{
                res.json(accessToken);
            }
        })
    }
});
router.get('/bytoken/:token', async (req,res)=>{
    const token=req.params.token;
    try{
    const result=jwt_decode(token);
    console.log(result);
    res.json(result);}
    catch(err){
        return res.json({error: err});
    }
})
router.get("/basicinfo/:id", async (req, res)=>{
    const id=req.params.id;
    const user=await Users.findByPk(id, {attributes: {exclude : ["password"] }});
    res.json(user);
});
module.exports = router;
