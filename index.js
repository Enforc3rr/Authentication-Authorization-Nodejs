const express = require("express");
const app = express();
const auth = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config({
    path : "./configurations/.env"
});
const db = require("./configurations/dbconfig");
//Parser has to be used at top
app.use(express.json());

//Connecting To DATABASE
db();

app.use(auth);

app.listen(8080 , ()=> console.log("Server Started"));