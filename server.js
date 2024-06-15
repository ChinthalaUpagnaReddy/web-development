//header files
const url = require('url');
const express = require('express')
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prajwalmb.cs22@rvce.edu.in',
      pass: 'Prajwalrvce@2481'
    }
  });
  var otp
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const { parse, stringify } = require('node:querystring');
var fs = require('fs');

app.set('view engine', 'ejs');
app.use("/",express.static(__dirname + "/views"))
//******************************** */
//uses
const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve } = require('path');
const { rejects } = require('assert');

//const { MongoClient } = require("mongodb");
//const { unzip } = require('node:zlib');
//const mongoose = require("mongoose");
//const uri1 ="mongodb://localhost:27017/loginll"
const uri3 = "mongodb+srv://prajwalmb37:Prajwal2481@prajwal.ne47coz.mongodb.net/?retryWrites=true&w=majority&appName=prajwal";
//const uri2 = "mongodb+srv://prajwalmb37:Prajwal2481@prajwal.ne47coz.mongodb.net/?retryWrites=true&w=majority&appName=prajwal/quizquestions";
//const uri = "mongodb+srv://praveen:Praveen2004@prajwal.ne47coz.mongodb.net/?retryWrites=true&w=majority&appName=prajwal/loginll";

const client = new MongoClient(uri3);

function generateotp() {
    let otp = "";
      const characters = '0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 6) {
        otp += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return otp;
    }
 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function generateAndStoreToken(email) {
  // Generate a token
  var token = generatetoken();

  try {
      // Connect to the MongoDB database
      await client.connect();

      // Insert the token into the token database along with the email ID
     
      const result = await client.db("token").collection("tokens").insertOne({
          email: email,
          token: token
      });

      console.log("Token stored successfully:", result.insertedId);

      return token; // Return the generated token
  } catch (error) {
      console.error("Error storing token:", error);
      throw error; // Throw the error for handling at a higher level
  } finally {
      // Close the MongoDB connection
      await client.close();
  }
}
async function getEmailFromToken(token) {
  try {
      // Connect to the MongoDB database
      await client.connect();

      // Find the document with the given token in the database
      const result = await client.db("token").collection("tokens").findOne({ token: token });

      // If a document is found, return its email ID, otherwise return null
      if (result) {
          return result.email;
      } else {
          return 1;
      }
  } catch (error) {
      console.error("Error retrieving email from token:", error);
      return 1; // Throw the error for handling at a higher level
  } finally {
      // Close the MongoDB connection
      await client.close();
  }
}
async function getDetailsByEmail(email) {
  try {
      // Connect to the MongoDB database
      await client.connect();

      // Find the document with the given email ID in the "details" collection
      const result = await client.db("token").collection("details").findOne({ email: email });

      // If a document is found, return its details, otherwise return null
      if (result) {
          return result;
      } else {
          return null;
      }
  } catch (error) {
      console.error("Error retrieving details by email:", error);
      throw error; // Throw the error for handling at a higher level
  } finally {
      // Close the MongoDB connection
      await client.close();
  }
}


var tokens = [];
// Configuration for your app

//*****************************************************************//
//generate token
function generatetoken() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


//*****************************************************************//
//main request
  app.get("" , (req,res)=>{
    d = __dirname + "/views/index.html"
        console.log(d);
        res.sendFile(d)
})
//*****************************************************************//

//login request
  app.post("/login" , async(req,res)=>{
   
    console.log(req.body);
    u = req.body.username;
    p = req.body.password;
    t = req.body.userType
    console.log("got request");
// This client object can be used to login multiple users.
//var q = new creds({ username: u , password: p, type:t });
//console.log(q.type); // 'Silence'
     // const query = { username: u , password: p ,type: t };
      //var a = await creds.findOne({username:u });
      await client.connect()
      a = await client.db("loginll").collection("creds").findOne({username:u });
    
      console.log("here");
      console.log(a);
      if (a) {
        var b = await client.db("loginll").collection("creds").findOne({username:u , password: p });
       await client.close();
       console.log("here");
        if (b) {
         
          var to = await generateAndStoreToken(u);
          console.log(to);
          var response4 = {
            "auth": "success",
            "token": to
          };
          //res.send(JSON.stringify(response4));
          ur="/session?token=" + to
        res.redirect(301 , ur)
        

           // res.render('home',{name: u ,usn:'1RV22CS141'})
        } else {
            res.render('login');
        }
      } else {
        totp = generateotp()
        otp = totp;
        var mailOptions = {
            from: 'prajwalmb.cs22@rvce.edu.in',
            to: u,
            subject: 'OTP to signup on stockone',
            text: 'Dear costomer thank you for using stockone trading site. your otp to signup on stock one is' + totp + '.do not share with anyone including us'
          };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.send('error occured')
            } else {
                res.render('signup',{name:u})
            }
          });
       
      }
      
      
  })
  
  app.post('/signup',async(req,res)=>{
    console.log(req.body);
    to = req.body.otp;
    e = req.body.email;
    if (to==otp) {
        res.render('password',{name:e});
    } else {
        res.send('error occured');
    }
  })
  app.post('/password',async(req,res)=>{
    console.log(req.body);
    to = req.body.password;
    e = req.body.email;
    t = req.body.userType;
    await client.connect()
    a = await client.db("loginll").collection("creds").insertOne({username:u , password: to , type: t});
    console.log(a);
    if (a) {
        res.render('home',{name: e ,usn:'1RV22CS141'})
    } else {
        res.send('error occured')
    }
    client.close()
  })
  app.get('/get',(req,res)=>{
    const r = url.parse(req.url, true);
    console.log(r);
    u = r.query.url;
    e = r.query.name;
   res.render(u , {name:e ,usn:"sssss"})
  })
  //////////////////////////////////////
  app.get('/ql1',async(req,res)=>{
    console.log("here");
    const r = url.parse(req.url, true);
    console.log(r);
    u = r.query.url;
    e = r.query.name;
    await client.connect();
    a = await client.db("quizquestions").collection(u).find({}).toArray();
   
        console.log(a);
  

        res.render('level1_quiz' , {data:a})
  })

  app.get('/session',async(req,res)=>{
    const r = url.parse(req.url, true);
    console.log('came h');
   // console.log(r);
    u = r.query.token;
    console.log(u);
    
      
    
  var email = await getEmailFromToken(u)
  
      if (email == 1) {
        d = __dirname + "/views/error.html"
        console.log(d);
        res.sendFile(d)
       } else {
        
         result = await getDetailsByEmail(email)
         console.log(result.name);
         res.render('home' , {name: result.name })

       }
    
    
   
    //e = r.query.name;
  // res.render(u , {name:e ,usn:"sssss"})
  })

/////////////////////
server = app.listen(3100 , '0.0.0.0' , ()=>{
    console.log("app listening on port 3100");
})
