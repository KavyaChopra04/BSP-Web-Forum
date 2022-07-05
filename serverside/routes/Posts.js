const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddleware");
const {Posts}=require("../models");
router.get("/", async (req, res)=>{
    const listOfPosts = await Posts.findAll()
    console.log(listOfPosts);
    res.json(listOfPosts);
});
router.get('/byId/:id', async (req,res)=>{
    const id=req.params.id;
    const post=await Posts.findByPk(id);
    res.json(post);
})
router.get('/byuserId/:id', async (req,res)=>{
    const id=req.params.id;
    const Postarr=await Posts.findAll({ where: {UserId : id}});
    console.log(Postarr);
    res.json(Postarr);
})

router.post("/", validateToken, async (req, res)=>{
    const post=req.body;
    post.author=req.user.username;
    await Posts.create(post);
    console.log(req.body.title);
    res.json(post);

});
router.put("/edit/:id", async (req, res)=>{
    const id=req.params.id;
    await Posts.update({ title: req.body.title, text: req.body.text }, {
        where: {
          id: id,
        }
      });
    res.json(req.body);
});
router.delete('/delete/:id', async(req,res)=>{
    const rid=req.params.id;
    console.log(rid);
    await Posts.destroy({where:
    {
        id: rid,
    },
    });
    res.json("Successfully deleted");
})
module.exports = router;
