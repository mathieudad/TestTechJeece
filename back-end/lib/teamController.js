var Team = require('./teamModel')
const Resp = require('./userModel').Resp

/*
function getResp(resp){
    Resp.getRespById(resp.idResp, function (err, resp) {
        if (err)
            res.send(err)

        return new Resp(resp)
        

    })
}
*/

exports.read_a_team = function (req, res) {
    Team.getTeamById(req.params.teamId, function (err, team) {
        if (err){
            res.send(err)
            return
        }
        Resp.getRespById(team.idResp, function (err, resp) {
            if (err){
                res.send(err)
                return
            }
            res.json(new Team(team, new Resp(resp)))
        })
    })
}