const express = require('express')
const app = express()
const port = 4000

app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile('create.html')
})

app.listen(port, () => {
  console.log("App is on")
})



