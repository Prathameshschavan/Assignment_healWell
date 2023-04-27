module.exports=(sequelize,DataTypes)=>{
    const Post = sequelize.define("post",{
        Title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Author:{
            type: DataTypes.STRING,
            allowNull: false    
        },
        Date:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Post;
}