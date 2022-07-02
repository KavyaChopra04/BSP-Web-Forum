const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddleware");
const {Posts}=require("../models");
router.get("/", async (req, res)=>{
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts);
});
router.get('/byId/:id', async (req,res)=>{
    const id=req.params.id;
    const post=await Posts.findByPk(id);
    res.json(post);
})
router.post("/", validateToken, async (req, res)=>{
    const post=req.body;
    post.author=req.user.username;
    await Posts.create(post);
    console.log(req.body.title);
    res.json(post);

});
module.exports = router;
