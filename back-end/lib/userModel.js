const sql = require('./db')
var Team = require('./teamModel')

const User = function (user, team) {
  this.lastName = user.lastName
  this.firstName = user.firstName
  this.eMail = user.eMail
  this.password = user.password
  this.team = team
}



User.getUserById = function (userId) {
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
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
            reject("Wrong password")
            return
          }
        }
        // not found user with the e-mail
        reject("Wrong e-Mail")
        return
      })
  })
}



function eMailGenerator(firstName, lastName) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM Users WHERE firstName = "${firstName}" AND lastName = "${lastName}";`, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      if (res.length) {
        const eMail = firstName + "." + lastName + "." + res.length + "@societe.com"
        resolve(eMail)
        return
      }
      const eMail = firstName + "." + lastName + "@societe.com"
      resolve(eMail)
      return
    })
  })
}

function containFigure(password) {
  const regex = /[0-9]/
  if(regex.exec(password) != null)
    return true
  return false
}

function containSpecial(password) {
  const regex = /[^A-Za-z0-9]/
  if(regex.exec(password) != null)
    return true
  return false

}

function containLowCase(password){
  const regex= /[a-z]/
  if(regex.exec(password)!= null)
    return true
  return false
}

function containUpperCase(password){
  const regex= /[A-Z]/
  if(regex.exec(password)!= null)
    return true
  return false
}

function checkPassword(password) {
  if (password.length < 6)
    return false
  if (!containFigure(password))
    return false
  if (!containSpecial(password))
    return false
  if(!containLowCase(password))
    return false
  if(!containUpperCase(password))
    return false
  return true
}

function emptyInfos(firstName, lastName, password, passwordConfirm, dept, numberTeam){
  if(firstName === undefined)
    return "empty first name !"
  if(lastName === undefined)
    return "empty last name !"
  if(password === undefined)
    return "empty password !"
  if(passwordConfirm === undefined)
    return "empty password confirmation !"
  if(dept === undefined)
    return "empty dept !"
  if(numberTeam === undefined)
    return "empty number team !"
  return 0
}



User.createNewUser = function (firstName, lastName, password, passwordConfirm, dept, numberTeam) {
  return new Promise(async function (resolve, reject) {
    const emptyInfo = emptyInfos(firstName, lastName, password, passwordConfirm, dept, numberTeam)
    if(emptyInfo != 0){
      reject(emptyInfo)
      return
    }
    if(passwordConfirm != password){
      reject("please enter the same password twice")
      return
    }

    const eMail = await eMailGenerator(firstName, lastName)
      .catch((err) => {
        reject(err)
        return
    })

    if (!checkPassword(password)) {
      reject("try an other password")
      return
    }
    
    const idTeam = await Team.getTeamByDeptNumber(dept, numberTeam).catch((err) => {
      reject(err)
      return
    })
    resolve(idTeam)
    return
  })
}

//User.getUserByLastFirstName()

//User.getUsersByTeam()


//User.deleteUser()





const Resp = function (user) {
  this.lastName = user.lastName
  this.firstName = user.firstName
}

Resp.getRespById = function (idResp) {
  return new Promise(function (resolve, reject) {
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