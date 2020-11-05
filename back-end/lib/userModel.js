const sql = require('./db')
const Team = require('./teamModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = function (user, team) {
  this.lastName = user.last_name
  this.firstName = user.first_name
  this.eMail = user.e_mail
  this.password = user.password
  this.team = team
}



User.getUserById = function (userId) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id = ${userId};`,
      (err, res) => {
        if (err) {
          reject(err)
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
    sql.query(`SELECT * FROM users WHERE e_mail = "${eMail}";`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.length) {
          bcrypt.compare(password, res[0].password, function (err, result) {
            if (err)
              reject(err)
            else if (result)
              resolve(res[0])
            else
              reject("Wrong password")
          })
        }
        else
          reject("Wrong e-Mail")
      })
  })
}

User.getUserByEMail = function (eMail) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE e_mail = "${eMail}";`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.length) {
          resolve(res[0])
          return
        } else
          reject("user not found at this eMail")
      })
  })
}

function eMailGenerator(fn, ln) {
  const firstName = fn.toLowerCase()
  const lastName = ln.toLowerCase()
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT e_mail FROM users WHERE first_name = "${firstName}" AND last_name = "${lastName}";`, (err, res) => {
      if (err) {
        reject(err)

      }
      else if (res.length === 1) {
        const eMail = firstName + "." + lastName + "." + 1 + "@societe.com"
        resolve(eMail)
      }
      else if (res.length > 1) {
        //const eMail = res[length-1]
        const str = (res[res.length - 1].e_mail).slice(0, (res[res.length - 1].e_mail).lastIndexOf("."))
        const str2 = str.slice(str.lastIndexOf("."), str.length)
        var number = str2.charAt(1)
        number++
        const eMail = firstName + "." + lastName + "." + number + "@societe.com"
        resolve(eMail)
      }
      else {
        const eMail = firstName + "." + lastName + "@societe.com"
        resolve(eMail)
      }
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
    if (idTeam === undefined)
      return
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        sql.query(`INSERT INTO users(id, last_name, first_name, e_mail, password, id_team) 
      VALUES (0,'${lastName}','${firstName}','${eMail}','${hash}',${idTeam.id});`,
          (err) => {
            if (err) {
              reject(err)
            }
            resolve(eMail)
          })
        if (err)
          reject(err)
      })
      if (err)
        reject(err)
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
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        sql.query(`INSERT INTO users(id, last_name, first_name, e_mail, password, id_team) 
    VALUES (0,'${lastName}','${firstName}','${eMail}','${hash}',NULL);`,
          (err) => {
            if (err) {
              reject(err)
            }
            resolve(eMail)
          })
      })
      if (err) reject(err)
    })
    if (err) reject(err)
  })
}

function updateTeamOfAUser(eMail, idTeam) {
  return new Promise(function (resolve, reject) {
    sql.query(`UPDATE users SET id_team = ${idTeam} WHERE e_mail = "${eMail}";`, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res.affectedRows)
      return
    })
  })
}

User.createNewUserAndTeam = function (firstName, lastName, password, passwordConfirm, dept) {
  return new Promise(async function (resolve, reject) {
    //cree un user sans team
    const eMail = await createNewUserWithoutTeam(firstName, lastName, password, passwordConfirm, dept).catch(
      (err) => {
        reject(err)
        return
      })
    //recup son id
    const user = await User.getUserByEMail(eMail)
    const idResp = user.id
    //cree une team avec lui pour responsable 
    const numberTeam = await Team.createNewTeam(idResp, dept)
    //recupere l'id de sa team
    const team = await Team.getTeamByDeptNumber(dept, numberTeam)
    //update l'user avec son idteam
    const up = await updateTeamOfAUser(eMail, team.id).catch(
      (err) => {
        reject(err)
        return
      })
    resolve(up)
  })
}


User.getUsersByDept = function (dept) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id_team IN ( 
                SELECT id FROM teams WHERE dept = "${dept}"
              );`, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      if (res.length) {
        resolve(res)
        return
      }
      reject("not Found users in this dept")

    })
  })
}


User.getUsersByTeam = function (dept, number) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id_team = (SELECT id FROM teams WHERE number = ${number} AND dept = "${dept}")`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        if (res.length) {
          resolve(res)
        }
        else
          reject("no users at this team")
      })

  })
}


function testMatch(res, name) {
  var match = new Array()
  name = name.toLowerCase()
  var j = 0
  for (i = 0; i < res.length; i++) {
    const firstName = (res[i].first_name).toLowerCase()
    const lastName = (res[i].last_name).toLowerCase()
    if (name.includes(firstName) && name.includes(lastName)) {
      match[j] = res[i]
      j -= -1
    }
  }
  if (!match.length) {
    for (i = 0; i < res.length; i++) {
      const firstName = (res[i].first_name).toLowerCase()
      const lastName = (res[i].last_name).toLowerCase()
      if (name.includes(firstName) || name.includes(lastName) ||
        firstName.includes(name) || lastName.includes(name)) {
        match[j] = res[i]
        j -= -1
      }
    }
  }
  return match
}

User.getUserByLastOrFirstNameAndDept = function (name, dept) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id_team IN (SELECT id FROM teams WHERE dept = "${dept}");`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        else if (res.length) {
          const match = testMatch(res, name)
          resolve(match)
          return
        } else {
          reject("no user at this name")
        }
      })
  })
}

User.getUserByLastOrFirstNameAndDeptAndNumber = function (name, dept, number) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id_team IN (SELECT id FROM teams WHERE dept = "${dept}" AND number = ${number});`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        else if (res.length) {
          const match = testMatch(res, name)
          resolve(match)
          return
        } else {
          reject("no user at this name")
        }
      })
  })
}



User.getUsersByDept = function (dept) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM users WHERE id_team IN ( 
                SELECT id FROM teams WHERE dept = "${dept}"
              );`, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      if (res.length) {
        resolve(res)
        return
      }
      reject("not Found users in this dept")

    })
  })
}

function testOldPW(eMail, oldPassword) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT password FROM users WHERE e_mail = "${eMail}"`,
      (err, res) => {
        if (err) {
          reject(err)
        } else if (res.length) {
          bcrypt.compare(oldPassword, res[0].password, function (err, result) {
            if (err)
              reject(err)
            else if (result)
              resolve("OK")
            else
              reject("wrong old password")
          }
          )
        }
        else reject("no user at this eMail")
      })
  })
}

User.setPassword = function (eMail, oldPassword, password, passwordConfirm) {
  return new Promise(async function (resolve, reject) {
    const testPW = await testOldPW(eMail, oldPassword).catch(
      (err) => {
        reject(err)
        return
      }
    )
    if (!testPW) return
    if (passwordConfirm != password)
      reject("please enter the same password twice")
    else if (!checkPassword(password)) {
      reject("try an other password")
    }
    else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          sql.query(`UPDATE users SET password = "${hash}" WHERE e_mail = "${eMail}";`,
            (err, res) => {
              if (err) {
                reject(err)
                return
              }
              resolve(res.affectedRows)
              return
            })
          if (err)
            reject(err)
        })
        if (err)
          reject(err)
      })
    }
  })
}



const Resp = function (user) {
  this.lastName = user.last_name
  this.firstName = user.first_name
}

Resp.getRespById = function (idResp) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT last_name, first_name FROM users WHERE id = ${idResp};`,
      (err, res) => {
        if (err) {
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