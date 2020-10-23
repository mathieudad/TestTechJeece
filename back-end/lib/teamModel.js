const sql = require('./db')

const Team = function (team, resp) {
  this.number = team.number
  this.dept = team.dept
  this.resp = resp
}



Team.getTeamById = function (teamId) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT * FROM Teams WHERE id = ${teamId};`,
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

//Team.getTeamByDept()

Team.getTeamByDeptNumber = function (dept, number) {
  return new Promise(function (resolve, reject) {
    sql.query(`SELECT id FROM Teams WHERE dept = "${dept}" AND number = ${number};`,
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

// Team.createNewTeam()

// Team.deleteTeam()



module.exports = Team