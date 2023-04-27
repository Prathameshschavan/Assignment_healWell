const express = require("express");
const cors = require('cors');
const router = require("./routes/userRoutes.js");
const postRoutor = require("./routes/postRoutes.js");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api",router)
app.use("/api/posts", postRoutor);
app.get("/", (req, res) => {
    res.json({message:"server is running fine!"})
})


// Server Listening
let PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})