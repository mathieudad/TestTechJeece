const express = require('express')
const app = express()
const port = 4000

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const fetch = require("node-fetch");

app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('create.html')
})

app.post('/create',(req, res) => {
  console.log(req.body)
  res.send("Formulaire bien envoye")

  fetch("http://localhost:3000/create", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => console.log(json));
  
})

app.listen(port, () => {
  console.log("App is on")
})



