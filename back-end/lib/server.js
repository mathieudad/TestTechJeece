const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const userController =  require('./userController')
const teamController =  require('./teamController')
const messageController = require('./messageController')


// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/users/:userId', userController.read_a_user)

app.post('/login',userController.read_a_login)

app.get('/team/:teamId', teamController.read_a_team)

app.post('/create', userController.create_user)

app.get('/findD', userController.read_users_by_dept)

app.get('/findN',userController.read_user_by_name_and_dept)

app.get('/messages',messageController.read_messages)


port = process.env.PORT || 3000;

app.listen(port)


