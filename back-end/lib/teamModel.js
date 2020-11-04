const sql = require('./db')

const Team = function (team, resp) {
  this.number = team.number
  this.dept = team.dept
  this.resp = resp
}



Team.getTeamById = function (teamId) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM teams WHERE id = ${teamId};`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.length) {

          resolve(res[0])
          return
        }

        // not found team with the id
        reject("team not found")
        return
      })
  })
}

//Team.getAllTeams()


Team.getTeamByDeptNumber = function (dept, number) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM teams WHERE dept = "${dept}" AND number = ${number};`,
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.length) {

          resolve(res[0])
          return
        }
        reject("team not found")
        return
      }
    )
  })
}

//recupere la derniere equipe pour un departement donné et retourne le numero suivant
function findMaxNumberOfDept(dept){
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT MAX(number) as max_number FROM teams WHERE dept = "${dept}";`,
    (err,res)=>{
      if(err){
        reject(err)
        return
      }

      if(res.length){
        resolve(res[0].max_number + 1)
        return
      }
      
      resolve('1')
      return
    })
  })
}

Team.createNewTeam =  function (idResp, dept){
  return new Promise(async function (resolve, reject) {
    const number = await findMaxNumberOfDept(dept).catch((err) => {
      reject(err)
      return
    })
    sql.query(`INSERT INTO teams(id, number, id_resp, dept) 
    VALUES (0,${number},${idResp},'${dept}');`,
    (err) => {
      if (err) {
        reject(err)
      }
        resolve(number)
    })
  })
  
}




module.exports = Team