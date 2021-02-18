const validate_schema = require('./validate_schema');
const Joi = require('joi');
const validation_body = require('./validation_body');

exports.login_validator = (req,res,next)=>{
    const valid = validate_schema.login_schema.validate(req.body);
    if(valid.error){
        res.status(422).json(validation_body.invalid_body('Validation Failed'));
    }else{
        next();
    }
}

exports.register_validator = (req,res,next) => {
    const valid = validate_schema.registration_schema.validate(req.body);
    if(valid.error){
        res.status(422).json(validation_body.invalid_body('Validation Failed'));
    }else{
        next();
    }
}