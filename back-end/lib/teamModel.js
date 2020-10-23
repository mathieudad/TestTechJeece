const sql = require('./db')
const Resp = require('./userModel').Resp

const Team = function (team, resp) {
  this.number = team.number
  this.dept = team.dept
  this.resp = resp
}



Team.getTeamById = function (teamId) {
  return new Promise( function(resolve, reject){
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
      reject("team not found" )
      return
    })
  })
}

//Team.getAllTeams()

//Team.getTeamByDept()

//Team.getTeamByDeptNumber()

// Team.createNewTeam()

// Team.deleteTeam()



module.exports = Team