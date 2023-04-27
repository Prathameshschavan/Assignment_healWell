const db = require("../models");
const { Verify } = require("./userController");
const Post = db.posts





const upload = async (req,res)=>{

    let token = Verify(req.body.token,res);
    if(token instanceof Error){
        res.status(401).json({message:"Invalid User"});
        return;
    }

    try {        

        let date = new Date()

        let currentDate = date.getDate();
        if(currentDate<10){
            currentDate="0"+(currentDate)
        }

        let month = date.getMonth();
        if(month<10){
            month="0"+(month+1)
        }

        let year = date.getFullYear();
        if(year<10){
            year="0"+(year)
        }
        let post = {
            Title : req.body.title,
            Description : req.body.description,
            Author : req.body.author,
            Date: currentDate+"-"+month+"-"+year,
        }
        let uploaded = await Post.create(post)
        res.send(uploaded);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const update = async (req,res)=>{
    let token = Verify(req.body.token,res);
    if(token instanceof Error){
        res.status(401).json({message:"Invalid User"});
        return;
    }
    try {
        let id = req.params.id;
        let  {author,title,description,} = req.body;
        let obj = {Author:author,Title:title,Description:description}
        let uploaded = await Post.update(obj,{where :{id:id}});
        res.send(uploaded);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


const deletefunc = async (req,res)=>{
    let token = Verify(req.body.token,res);
    if(token instanceof Error){
        res.status(401).json({message:"Invalid User"});
        return;
    }
    try {
        let id = req.params.id;
        await Post.destroy({where :{id:id}});
        res.send("Post deleted successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


const getAll = async (req,res)=>{
    let token = Verify(req.body.token,res);
    if(token instanceof Error){
        res.status(401).json({message:"Invalid User"});
        return;
    }
    try {
        let author = req.body.author;
        let posts = await Post.findAll({where :{Author:author}});
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
 
module.exports = {upload,update,deletefunc,getAll}; 