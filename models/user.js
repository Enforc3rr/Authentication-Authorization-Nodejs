const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required :  true ,
        min : 6 ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
        min : 6
    },
    date : {
        type : Date ,
        default : Date.now
    }
});

module.exports = mongoose.model("user",userSchema);