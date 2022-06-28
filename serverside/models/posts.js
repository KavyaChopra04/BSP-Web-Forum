module.exports=(sequelize, DataTypes)=>{
    const Posts=sequelize.define("Posts",{
        title:{
            type: DataTypes.STRING,
            allowNUll: false,
        },
        author:{
            type: DataTypes.STRING,
            allowNUll: false,
        },
        text:{
            type: DataTypes.STRING,
            allowNUll: true,
        },
        image:{
            type: DataTypes.STRING,
            allowNUll: true,
        },
    })
    Posts.associate=(models) =>{
        Posts.hasMany(models.Comments,{
            onDelete: "cascade",
        });
    };
    return Posts;
}