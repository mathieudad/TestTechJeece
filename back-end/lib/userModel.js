const sql = require('./db')

const User = function (user, team) {
  this.lastName = user.lastName
  this.firstName = user.firstName
  this.eMail = user.eMail
  this.password = user.password
  this.team = team
}



User.getUserById = function (userId){
  return new Promise(function(resolve, reject){
  sql.query(`SELECT * FROM Users WHERE id = ${userId};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        reject(Error(err))
        return
      }

      if (res.length) {
        resolve(res[0])
        return 
      }

      // not found user with the id
      reject("user not found")
      return
    })

  })
}


//User.getAllUser()

//User.getUsersByDept()

User.getUserByLogin = function (eMail, password) {
  return new Promise(function(resolve, reject){
  sql.query(`SELECT * FROM Users WHERE eMail = "${eMail}";`,
    (err, res) => {
      if (err) {
        reject(err)
        return
      }

      if (res.length) {
        if (password === res[0].password) {
          resolve(res[0])
          return
        }
        else {
          reject("wrong password")
          return
        }
      }
      // not found user with the e-mail
      reject( "wrong e-Mail")
      return
    })
  })
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


async function eMailGenerator(firstName, lastName) {
  var eMail = firstName + "." + lastName + "@societe.com"
  var i = 0
  var boolean = false
  //console.log(boolean === false)
  //while (boolean === 'false') {
    const k = await sql.query(`SELECT * FROM Users WHERE eMail = "${eMail}";`, (err, res) => {
      if (err)
          return
      if (res.length) {
        i -= -1
        eMail = firstName + "." + lastName + "." + i + "@societe.com"
        console.log("false email " , eMail)
        return
      }
      //console.log("true email : ", eMail)
      boolean = true
      //console.log(boolean)
      return
    })
    console.log("k :", k)
  //}
  return k
}

function checkPassword() {

}

User.createNewUser = function (firstName, lastName, result) {
  const eMail = eMailGenerator(firstName, lastName)
  result(null, eMail)
  return
}

//User.getUserByLastFirstName()

//User.getUsersByTeam()


//User.deleteUser()





const Resp = function (user) {
  this.lastName = user.lastName
  this.firstName = user.firstName
}

Resp.getRespById = function (idResp) {
  return new Promise(function(resolve, reject){
      sql.query(`SELECT lastName, firstName FROM Users WHERE id = ${idResp};`,
        (err, res) => {
          if (err) {
            console.log("error: ", err)
            reject(err)
            return
          }

          if (res.length) {
            resolve(res[0])
            return
          }

          // not found user with the id
          reject("resp not found")
          return
        
    })
  })
}




module.exports = { User: User, Resp: Resp }