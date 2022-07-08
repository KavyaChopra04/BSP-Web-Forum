const express=require('express');
const cors=require("cors");
const app=express();
app.use(express.static(path.resolve(__dirname, "./clientside/build")));
app.use(express.json());
app.use(cors());
const db=require("./models");
const userRouter = require('./routes/Users');
const postRouter = require('./routes/Posts');
const commentRouter = require('./routes/Comments');
app.use("/posts", postRouter)
app.use("/users", userRouter)
app.use("/comments", commentRouter)
db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("server running on 3001");
    })
})