const express = require('express'); //import the library
const https = require('https');
const port = 4043;
const app = express(); //use the library
const fs = require('fs');
const md5 = require('md5');
const bodyParser = require('body-parser'); //body parser is called middleware
const {createClient} =require('redis');
const { response } = require('express');
const { fstat } = require('fs');
const redisClient = createClient(
{
  url: 'redis://AlexD@10.128.0.2:6379',
  socket:{
      port:6379,
      host:"127.0.0.1",
  },
}
);

redisClient.connect();

app.use(bodyParser.json());

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd',
  }, app).listen(port, async()=>{
    console.log("Listening on Port: "+port) //listening
});

const validatePassword = async(request,response) => {
    //await redisClient.connect();
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword = await redisClient.hmGet('passwords',request.body.userName);
    const loginRequest = request.body;
    console.log("Requesting Body",JSON.stringify (request.body));
    //search database for username, and retrieve current password

    //compare hash version of pass that was sent with the hashed version from database
    if(loginRequest.userName == "randomemail@gmail.com" && requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
    }

}
app.get('/',(request,response)=>{
    response.send("Hello") //respond
})

// responding to a call from a post 
app.post('/login',validatePassword);

// Creating a sign-up to add into the redis client
const signUp = async (request,response) => {
    const clearTextPassword = request.body.password;
    const hashedTextPassword = md5(clearTextPassword);
    await redisClient.hSet ('passwords',request.body.userName,hashedTextPassword);
    response.status(200);
    response.send({result:"Saved"});
}

app.post('/signup', signUp);