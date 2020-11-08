const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
var session = require('express-session');
const port = 4000

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());
app.use(session({secret : "secret"}));

const fetch = require("node-fetch");
const { get } = require('jquery');

app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('create.html')
})

app.get('/profil', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('profil.html')
})

app.get('/home_page', (req, res) => {
  res.set('Content-Type', 'text/html');
  /*fetch("http://localhost:3000/find", {
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
  });*/
  res.sendfile('home_page.html')
})

app.get('/login', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('login.html')
})

app.get('/chat', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('chat.html')
})

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
      req.session.e_mail = json;
      console.log(req.session.e_mail)
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