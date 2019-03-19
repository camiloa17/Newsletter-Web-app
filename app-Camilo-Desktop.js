const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.emailAddress;
    console.log(firstName + lastName + email);
});

app.listen(3000, function(){
    console.log("Server started on host 3000");
    
});
