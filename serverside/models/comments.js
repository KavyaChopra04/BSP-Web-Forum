module.exports=(sequelize, DataTypes)=>{
    const Comments=sequelize.define("Comments",{
        commentBody:{
            type: DataTypes.STRING,
            allowNUll: false,
        },
        author:{
            type: DataTypes.STRING,
            allowNUll: false,
        },
    })
    return Comments;
}