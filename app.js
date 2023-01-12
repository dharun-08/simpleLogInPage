const express = require('express');
const mysql = require("mysql");
// const dotenv = require('dotenv')
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();

//create a db connection
const db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'password',
   database:'login'

});

//connect to the database
db.connect((error) => {
    if(error)
    {
        console.log("Database Error");
    }
    else
    {
        console.log("Database connected");
    }
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",encoder,function(req,res){
    var userName = req.body.username;
    var passWord = req.body.pass;
    db.query("select * from user_login where username = ? and pass = ?",[userName,passWord],function(error,results,fields){
        if(results.length > 0)
        {
            res.redirect("/login");
        }
        else
        {
            res.redirect("/");
        }
        res.end();
    })
})

//when login success
app.get("/login",function(req,res){
    res.sendFile(__dirname + "/login.html")
})

//listen to port 4500
app.listen(4500);