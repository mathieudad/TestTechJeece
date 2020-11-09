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

var sess;

//////////////////////////////GET////////////////////
app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('create.html')
})

app.get('/profil', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('index',{lastName : sess.lastName, firstName : sess.firstName, team : sess.team.number, dept : sess.team.dept})
})

app.get('/home_page', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile("home_page.html")
  const url = "http://localhost:3000/home_page";
  fetch(url, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      //application/x-www-form-urlencoded
      
  })
  .then(res => res.json())
  .then( data => {
      console.log(data[0])
  })
  .catch(err => console.log(err));
})

app.get('/login', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('login.html')
})

app.get('/chat', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('chat.html')
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
    if(json){
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

app.listen(port, () => {
  console.log("App is on")
})
