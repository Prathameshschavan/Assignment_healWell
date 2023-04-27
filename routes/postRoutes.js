const express = require('express');
const { upload ,update,deletefunc,getAll} = require('../controllers/postController');

const postRoutor = express.Router();


postRoutor.post("/upload", upload);

postRoutor.put("/update/:id", update);

postRoutor.delete("/delete/:id", deletefunc);

postRoutor.get("/", getAll);

module.exports= postRoutor;