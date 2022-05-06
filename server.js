const express = require('express'); //import the library

const port = 3000;

const app = express(); //use the library

const bodyParser = require('body-parser'); //body parser is called middleware
const { response } = require('express');

app.use(bodyParser.json());

app.listen(port,()=>{console.log("Listening on Port: "+port)}); //listen

app.get('/',(req,res)=>{res.send("Hello")}); //respond

app.post('/login', (request,response)=>{
    const loginRequest = request.body;
    if (loginRequest.userName=="randomemail@gmail.com" && loginRequest.password=="P@ssword1"){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
    }
});