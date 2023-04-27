const { validationResult, body } = require("express-validator");


const bodyValidation = {
    name: body("name", "Must be string, Cannot be empty").notEmpty().isString(),
    email: body("email", "Must be string, cannot be wmpty").notEmpty().isEmail(),
    password: body("password", "Must be string, Cannot be empty").notEmpty().isString(),
  };

const registerValidatior = [
    bodyValidation.name,
    bodyValidation.email,
    bodyValidation.password,
    validationResponse,
  ];


 const loginValidatior = [
    bodyValidation.email,
    bodyValidation.password,
    validationResponse,
  ];

function validationResponse(req, res, next) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(500).json({message:"Invalid Data Input"});
    }
    next();
  }

  module.exports ={validationResponse,registerValidatior,loginValidatior}