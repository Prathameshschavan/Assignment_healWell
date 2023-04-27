const express = require("express");
const { register, Login, Verify } = require("../controllers/userController.js");

const { loginValidatior,registerValidatior } = require("../middleware/userValidator.js");
const router = express.Router();





router.post("/register", registerValidatior, register);




router.post("/login",loginValidatior, Login);

// router.post("/verify",(req,res)=>{
//     let token = req.body.token;
//     try {
//         let user = Verify(token);
//         res.send("OK");
//     } catch (error) {
//         res.send("Not OK");
//         console.log(error)
//     }

// })

module.exports = router;
