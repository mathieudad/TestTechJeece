const { resolve } = require('path')
const sql = require('./db')
const Team = require('./teamModel')


const User = function (user, team) {
  this.lastName = user.lastName
  this.firstName = user.firstName
  this.eMail = user.eMail
  this.password = user.password
  this.team = team
}



User.getUserById = function (userId) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id = ${userId};`,
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

User.getUserByEMail = function (eMail) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM Users WHERE eMail = "${eMail}";`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.length) {
          resolve(res[0])
          return
        }
        reject("user not found by eMail")
      })
  })
}

function eMailGenerator(fn, ln) {
  const firstName = fn.toLowerCase()
  const lastName = ln.toLowerCase()
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM Users WHERE firstName = "${firstName}" AND lastName = "${lastName}";`, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      if (res.length) {
        //const eMail = res[length-1]

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
  if (regex.exec(password) != null)
    return true
  return false
}

function containSpecial(password) {
  const regex = /[^A-Za-z0-9]/
  if (regex.exec(password) != null)
    return true
  return false

}

function containLowCase(password) {
  const regex = /[a-z]/
  if (regex.exec(password) != null)
    return true
  return false
}

function containUpperCase(password) {
  const regex = /[A-Z]/
  if (regex.exec(password) != null)
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
  if (!containLowCase(password))
    return false
  if (!containUpperCase(password))
    return false
  return true
}

function emptyInfos(firstName, lastName, password, passwordConfirm, dept, numberTeam) {
  if (firstName === undefined)
    return "empty first name !"
  if (lastName === undefined)
    return "empty last name !"
  if (password === undefined)
    return "empty password !"
  if (passwordConfirm === undefined)
    return "empty password confirmation !"
  if (dept === undefined)
    return "empty dept !"
  if (numberTeam === undefined)
    return "empty number team !"
  return 0
}



User.createNewUser = function (firstName, lastName, password, passwordConfirm, dept, numberTeam) {
  return new Promise(async function (resolve, reject) {
    const emptyInfo = emptyInfos(firstName, lastName, password, passwordConfirm, dept, numberTeam)
    if (emptyInfo != 0) {
      reject(emptyInfo)
      return
    }
    if (passwordConfirm != password) {
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
    console.log(idTeam)
    if (idTeam === undefined)
      return

    sql.query(`INSERT INTO Users(id, lastName, firstName, eMail, password, idTeam) 
    VALUES (0,'${lastName}','${firstName}','${eMail}','${password}',${idTeam.id});`,
    (err) => {
      if (err) {
        reject(err)
      }
      resolve("OK!")
    })
  })
}

function createNewUserWithoutTeam(firstName, lastName, password, passwordConfirm, dept) {
  return new Promise(async function (resolve, reject) {
    //numberTeam unused in this function
    const emptyInfo = emptyInfos(firstName, lastName, password, passwordConfirm, dept, -1)
    if (emptyInfo != 0) {
      reject(emptyInfo)
      return
    }
    if (passwordConfirm != password) {
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
    sql.query(`INSERT INTO Users(id, lastName, firstName, eMail, password, idTeam) 
    VALUES (0,'${lastName}','${firstName}','${eMail}','${password}',NULL);`,
      (err) => {
        if (err) {
          reject(err)
        }
        resolve(eMail)
      })

  })
}

User.createNewUserAndTeam = function (firstName, lastName, password, passwordConfirm, dept) {
  return new Promise(async function (resolve, reject) {
    const eMail = await createNewUserWithoutTeam(firstName, lastName, password, passwordConfirm, dept).catch(
      (err) => {
        reject(err)
        return
      })
    const user = await User.getUserByEMail(eMail)
    const idResp = user.id

    const numberTeam = await Team.createNewTeam(idResp,dept)
    const team = await Team.getTeamByDeptNumber(dept, numberTeam)
    const idTeam = team.id
    resolve(team)
  })
}


//User.getUserByLastFirstName()

//User.getUsersByTeam()


//User.deleteUser()


//User.getAllUser()

User.getUsersByDept = function (dept){
  return new Promise( function (resolve, reject) {
    sql.query(`SELECT * FROM Users WHERE idTeam IN ( 
                SELECT id FROM Teams WHERE dept = "${dept}"
              );`,(err,res) => {
                if (err) {
                  reject(err)
                  return
                }
                if(res.length){
                  resolve(res)
                  return
                }
                reject("not Found users in this dept")

              })
  })
}



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