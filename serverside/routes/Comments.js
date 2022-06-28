const express = require("express");
const router = express.Router();
const {Comments}=require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");
module.exports=router;
router.get('/:PostId', async (req,res)=>{
    const PostId=req.params.PostId;
    const commentsarr=await Comments.findAll({where : {PostId : PostId}});
    res.json(commentsarr);
})
router.post("/", validateToken,  async (req, res)=>{
    const comment=req.body;
    await Comments.create(comment);
    console.log(req.body.commentBody);
    res.json(comment);
});