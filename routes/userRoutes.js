const express = require("express");
const { register, Login, Verify } = require("../controllers/userController.js");

const { loginValidatior,registerValidatior } = require("../middleware/userValidator.js");
const router = express.Router();





router.post("/register", registerValidatior, register);




router.post("/login",loginValidatior, Login);


module.exports = router;
