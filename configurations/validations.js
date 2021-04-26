const joi = require("joi");

//To validate the data sent by the client.
exports.registrationValidation = data =>{
    const schema = joi.object({
        username : joi.string().min(6).required(),
        password : joi.string().min(6).required(),
    });
    //we can also use join.string().min(-).required().email() for email validation.
    return schema.validate(data);
};

