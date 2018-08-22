var express = require('express')
var app = express();
var fs=require('fs');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session=require('express-session');
let ue=bodyParser.json();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'udhyogprovider@gmail.com',
    pass: 'udhyogforu'
  }
});


mongoose.connect("mongodb://TravelCity:manjunatha9598@ds125322.mlab.com:25322/travelcity");
/* Register collection  for employeesss*/
let contactus=new mongoose.Schema({
  name:String,
  email:String,
  subject:String,
  message:String,
  option:String
});
let Reg1 = mongoose.model("contactus", contactus);
/*-------------------------------------------------------------------------------*/
/*Register Collection foe recuiter*/
let recuiterSchema=new mongoose.Schema({
  company_name:String,
  Company_website:String,
Company_Location:String,
name_of_ceo:String,
  email:String,
  password:String,
  //option:String,
  question:String
});
let Recui1 = mongoose.model("recuiter", recuiterSchema);
/*----------------------------------------------------------------------------------*/
/*Skill Collectionn------------------------------*/
let skillSchema=new mongoose.Schema({
  technology:String,
  github_link:String,
certificate:String

});
let skill1 = mongoose.model("skill", skillSchema);
/*------------------------------------------------------------------------------------*/

/*------------------------------------------------------------*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*Display on console of Register insert documentssss For employeess--------------------------------*/
app.get("/Reg1",function(req,res){
  Reg1.find({},function(err,data){
    console.log(data);
    res.json(data);
  });
});
/*--------------------------------------------------------------*/

/*Display on console of Register insert documentssss For RECUITERS--------------------------------*/
app.get("/Recui1",function(req,res){
  Recui1.find({},function(err,data){
    console.log(data);
    res.json(data);
  });
});
/*-------------------------------------------------------------------------------*/
/*Resgister insert of employees &NODE MAILER SERVICE------------------------------*/
app.post('/addemp',ue,function(req, res) {
  console.log(req.body);
  var mailOptions = {
    from: 'udhyogprovider@gmail.com',
    to: req.body.email,
    subject: 'Welcome',
    text: 'Welcome to Udhyog',
   html: '<html><head><title>Udhyog</title><link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script></head><body><div class="row"><div class="col s12"><div class="card white" ><div class="card-content black-text"><span class="card-title"><a href="https://ibb.co/kKL3GK"><img src="https://preview.ibb.co/cadZOz/logo.png" alt="logo" style="width:150%;"></a></span><hr><p style="font-family:sans-serif;">We are welcoming you for our site. Get more choices which matters for you. Thank You...</p></div><div class="card-action"><a href="www.google.com/Udhyog"><p style="color:blue;font-size:75%;"> not you...!</p></a></div></div></div></div></body></html>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  Reg1(req.body).save(function(err,data){
    res.json(data);
  });
});

/*----------------------------------------------------------------------------------*/

/*Register insert for recuiter $node mailer servicesss*/
app.post('/addrec',ue,function(req, res) {
  console.log(req.body);
  var mailOptions = {
    from: 'udhyogprovider@gmail.com',
    to: req.body.email,
    subject: 'Welcome',
    text: 'Welcome to Udhyog',
   html: '<html><head><title>Udhyog</title><link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script></head><body><div class="row"><div class="col s12"><div class="card white" ><div class="card-content black-text"><span class="card-title"><a href="https://ibb.co/kKL3GK"><img src="https://preview.ibb.co/cadZOz/logo.png" alt="logo" style="width:150%;"></a></span><hr><p style="font-family:sans-serif;">We are welcoming you for our site. Get more choices which matters for you. Thank You...</p></div><div class="card-action"><a href="www.google.com/Udhyog"><p style="color:blue;font-size:75%;"> not you...!</p></a></div></div></div></div></body></html>'
  };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  Recui1(req.body).save(function(err,data){
    res.json(data);
  });
  });
/*---------------------------------------------------------------------------------------------------------------------*/

/*COMPLETE YOUR PROFILE FOR RECUITERS*/
app.post('/recuiter',ue,function(req, res) {
  console.log(req.body);
  var myquery = { email: req.body.email };
    var newvalues = { $set: {company_name: req.body.company_name, Company_website: req.body.Company_website,Company_Location:req.body.Company_Location,
    contact:req.body.contact,name_of_ceo:req.body.name_of_ceo}}
   Recui1.updateOne(myquery, newvalues, function(err, data){
    res.json(data);
});
});
/*^^^^^^^^^^^^^^!!!!!!!!!!!!&(&(&(!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)))*/
/*Login for employee--------------------------------------------------------------------------*/
app.post('/loginemp',ue,function(req,res){
  //console.log(req.body.email);

var email=req.body.email;
  var password=req.body.password;
  Reg1.findOne({email:email,password:password},function(err,data){
    if(err){
      console.log(err);
     return res.status(500).send();
    console.log('error');
    }
    if(!data){
      return res.status(404).send();
      console.log('fail1');
    }
    // var name="email";
    // var value=req.body.email;
     //req.session[name]=value;
     req.session.email=req.body.email;
console.log("-----session inside-----");
     console.log(req.session);
    // console.log("insidelogin session"+req.session.email);

    //return res.status(200).send();
  //  req.session.email=email;
    console.log('success');
    res.send({message:"successful login",
    email:req.body.email
  });
    //res.json(data);
});
//console.log(req.session);
//console.log("session "+req.session.email);
});
/*-------------------------------------------------------------------------------------------------------------------------------*/
/*Login for recuiters--------------------------------------------------------------------#############################*/
app.post('/loginrec',ue,function(req,res){
  console.log(req.body.email);
  var email=req.body.email;
  var password=req.body.password;
  Recui1.findOne({email:email,password:password},function(err,data){
    if(err){
      console.log(err);
     return res.status(500).send();
    console.log('error');
    }
    if(!data){
      return res.status(404).send();
      console.log('fail1');
    }
    //return res.status(200).send();
    console.log('success');
    res.send({message:"successful login",
    email:req.body.email
  });
    //res.json(data);
});
});
/*----------------------------------------------------@@@#@#@#@#@#@#@#@#@@#@#@@@*/

/*retriva of employee data in profile page*/
app.get("/employeeprofile",function(req,res){
  console.log("------session outside --------");
 console.log(req.session.email);
    Reg1.findOne({email:req.query.email},function(err,data){
   console.log(data);
    res.json(data);
});
});
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

/*retrival for recuiter profile------------------------*/
app.get("/recuiterprofile",function(req,res){
  console.log(req.query.email);
    Recui1.findOne({email:req.query.email},function(err,data){
   console.log(data);
    res.json(data);
});
});
/**********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*-------------------ADD SKILLS FR EMPLOYEEEE----------------------*/
app.get("/skill1",function(req,res){
  skill1.find({},function(err,data){
    console.log(data);
    res.json(data);
  });
});
app.post('/addskill',ue,function(req, res) {
  console.log(req.body);
  skill1(req.body).save(function(err,data){
    res.json(data);
  });
});
/*---------------------------------------------------------------*/
/*-------------------------ADD JOB FOR RECUITER------------------------*/
app.get("/addjobs1",function(req,res){
  addjobs1.find({},function(err,data){
    console.log(data);
    res.json(data);
});
});
app.post('/addjobs1',ue,function(req, res) {
  console.log(req.body);
  addjobs1(req.body).save(function(err,data){
    res.json(data);
  });
});
/*-----------------------------------------------------------------------*/
/*app.get('/index',function(req,res){
//  console.log("insidedash"+req.session.email);
res.send(req.session);
if(!req.session){
  return res.status(401).send('fail');
}
console.log("outsidesession"+req.session[name]);

return res.status(200).send("welcome to super secrete");

})*/
app.listen(3000);
console.log("server started");

console.log("done");
