const express = require('express'); //import the library

const port = 3000;
const app = express(); //use the library
const md5 = require('md5');
const bodyParser = require('body-parser'); //body parser is called middleware
const {createClient} =require('redis');
const { response } = require('express');
const redisClient = createClient(
{
  socket:{
      port:6379,
      host:"127.0.0.1",
  },
}
);
redisClient.connect();

app.use(bodyParser.json());

app.listen(port, async()=>{
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
    res.send("Hello") //respond
})

// responding to a call from a post 
app.post('/login',validatePassword);

// Creating a sign-up to add into the redis client
// const signUp = (request,response) => {
//     const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     readline.
// };

// app.post('/signup', signUp);