const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const userController =  require('./userController')
const teamController =  require('./teamController')


// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/users/:userId', userController.read_a_user)

app.post('/login',userController.read_a_login)

app.get('/team/:teamId', teamController.read_a_team)

app.post('/create', userController.create_a_user)

app.post('/create/team', teamController.create_a_team)

app.post('/create/userTeam',userController.create_a_user_and_team)

app.get('/allUsers/:dept', userController.read_users_by_dept)

port = process.env.PORT || 3000;

app.listen(port)


