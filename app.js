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

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.emailAddress;

    const data = {
        members: [
            {
                email_address:email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME:lastName,
                }
            }
        ]
    };

   const jsonData = JSON.stringify(data);

    const options = {
        url: "https://us16.api.mailchimp.com/3.0/lists/040c7424e5",
        method:"POST",
        headers: {
            "Authorization": "camilo1 c0377555dea6ab01fabf7c86cb6467af - us16"
        },
        body: jsonData,
       
    };

    request(options, function(error,response,body){
        if (error){
            res.sendFile(__dirname + "/failure.html");
            console.log(error);
            
        }else {
            console.log(response.statusCode);
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else {
                res.sendFile(__dirname + "/failure.html");
            }
            
            
        }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server started on host 3000");
    
});

