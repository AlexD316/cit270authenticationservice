const express = require('express'); //import the library
const port = 3000;
const app = express(); //use the library
const bodyParser = require('body-parser'); //body parser is called middleware
const { response } = require('express');
const md5 = require('md5');
const redis = require('redis');
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379});

app.use(bodyParser.json());

app.listen(port,()=>{console.log("Listening on Port: "+port)}); //listen

app.get('/',(req,res)=>{res.send("Hello")}); //respond

// responding to a call from a post 
app.post('/login',async (request,response)=>{
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword= await redisClient.hmGet('passwords',request.body.userName);
    const loginRequest = request.body;
    console.log("Request Body",JSON.stringify(request.body));
    //search database for username, and retrieve current password

    //compare hash version of pass that was sent with the hashed version from database
    if (loginRequest.userName=="randomemail@gmail.com" && loginRequest.password=="P@ssword1"){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
    }
});