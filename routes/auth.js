const router = require("express").Router();
const User = require("../models/user");
const {registrationValidation} = require("../configurations/validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {verifyToken} = require("./verifyToken");



router.post("/register",async (req, res) => {
    const {error} = registrationValidation(req.body);
    if(error) return  res.status(400).json({error : error.details[0].message});

    //Hashing Password using bcryptjs
    //we generate salt which is basically just a 10 characters long randomly generated string. And it gets added in front of the bcrypt password.
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password , salt);

    const user = new User({
        username : req.body.username ,
        password : hashedPass
    });
    await user.save();
    res.status(201).json({
        userId : user._id
    });
});

router.post("/login", async (req, res) => {
    const userFound = await User.findOne({username : req.body.username});
    if(!userFound) return res.status(400).send("User Not Found");

    const validPass = await bcrypt.compare(req.body.password,userFound.password);
    if(!validPass) return  res.status(400).send("password is wrong");

    //Create And Assign A Token
    //jwt.sign(payload) Here we are just returning the id , but it usually contains information like role , username etc.
    const token = jwt.sign({_id : userFound._id , username : userFound.username},process.env.SECRET_TOKEN);
    //as an option in token we can add expiredIn field which will make out token expire in that days , refer to documentation of jsonwebtokens for more.

    res.header('auth-token',token).send(token);

});

//To Make A route private , we simply add a middleware (here verifyToken) in get method.
router.get("/post", verifyToken ,(req, res) => {
    res.send("Post Made");
})

module.exports = router;