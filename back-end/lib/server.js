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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        res.send();
    });
});

//app.get('/users/:userId', userController.read_a_user)

app.post('/login',userController.read_a_login)

app.get('/home_page',userController.read_user_by_eMail)

app.post('/create', userController.create_user)

app.get('/find',userController.read_users_by_name_dept_number)

app.get('/chat',messageController.read_messages)

app.post('/chat',messageController.write_messages)

app.post('/profile', userController.set_password)

port = process.env.PORT || 3000;

app.listen(port)


