const express = require('express');
const app = express()
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const port = 4000
const pug = require('pug');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());
app.use(session({secret : "secret"}));

const fetch = require("node-fetch");
const { get } = require('jquery');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

///////////////module/////////////////////////

var sess,mail1,mail2;
var listPeople = [];

//////////////////////////////GET////////////////////
app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('create.html')
})

app.get('/profil', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('index',{lastName : sess.lastName, firstName : sess.firstName, team : sess.team.number, dept : sess.team.dept, eMail : sess.eMail})
})

app.get('/home_page', (req, res) => {
  res.set('Content-Type', 'text/html');
  console.log(req.url)
  const url = "http://localhost:3000";
  fetch(url+req.url, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      //application/x-www-form-urlencoded
      
  })
  .then(res => res.json())
  .then( data => {
    console.log(data)
    res.render('home_page',{data : data, mail : sess.eMail})
  })
  .catch(err => console.log(err));
})

app.get('/login', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('login.html')
})

app.get('/chat', (req, res) => {
  res.set('Content-Type', 'text/html');

  var temp = req.url,temp1,temp2;
  const chars = temp.split('');
  var condi = true;
  var j,k;
  for(var i=12;i<temp.length && condi===true;i++){
    if(temp[i]=='%'){
      condi = false
      j = i
    }
  }
  temp1 = temp.substring(12,j)
  condi = true;
  for(var i=13;i<temp.length && condi===true;i++){
    if(temp[i]=='='){
      condi = false
      k = i
    }
  }
  condi=true;
  for(var i=k;i<temp.length && condi===true;i++){
    if(temp[i]=='%'){
      condi = false;
      j = i;
    }
  }
  temp2 = temp.substring(k+1,j);
  if(temp1!="chat" && temp1!=""){
    console.log("c diff1")
    mail1 = temp1+"@societe.com";
  }
  if(temp2!="/chat"){
    console.log("c diff1")
    mail2 = temp2+"@societe.com";
  }

  console.log("mail1 = "+mail1+" mail2 = "+mail2)

  const url = "http://localhost:3000";
  console.log(url+"/chat/"+mail1+"/"+mail2)
  fetch(url+"/chat/"+mail1+"/"+mail2, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      //application/x-www-form-urlencoded
  })
  .then(res => res.json())
  .then( data => {
    console.log(data)
    res.render('chat',{mail1 : mail1, mail2 : mail2, data : data})
  })
  .catch(err => console.log(err));
})

/////////////////////////////////POST////////////////////

app.post('/profil',(req, res) => {
  fetch("http://localhost:3000/profil", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    if(json){
      console.log(json);
    }
    else{
      console.log(json);
      res.sendfile('create.html')
    }
  });
})

app.post('/create',(req, res) => {
  fetch("http://localhost:3000/create", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    if(json){
      sess = json;
      console.log(json);
      res.redirect('/home_page')
    }
    else{
      console.log(json);
      res.sendfile('create.html')
    }
  });
})

app.post('/login',(req, res) => {
  fetch("http://localhost:3000/login", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { 
      'Content-Type': 'application/json'},
  })
  .then(res => res.json())
  .then(json => {
    if(json.eMail){
      sess = json;
      console.log(json)
      res.redirect('/home_page');
    }
    else{
      console.log(json);
      res.sendfile('login.html')
    }
  });
})

app.post('/chat',(req, res) => {
  fetch("http://localhost:3000/chat", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    if(json){
      console.log(json);
      res.redirect('/chat')
    }
    else{
      console.log(json);
    }
  });
})

app.listen(port, () => {
  console.log("App is on")
})
