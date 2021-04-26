const mongoose = require("mongoose");

const db = async ()=>{
    const conn = await mongoose.connect(process.env.DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    console.log("Connected To Database");
}

module.exports = db;