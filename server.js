const express = require('express'); //import the library

const port = 3000;

const app = express.application; //use the library

app.listen(port,()=>{console.log("Listening on Port: "+port)}); //listen

app.get('/',(req,res)=>{res.send("Hello")}); //respond