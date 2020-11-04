var Team = require('./teamModel')
const Resp = require('./userModel').Resp


exports.read_a_team = async function (req, res) {
    const team = await Team.getTeamById(req.params.teamId).catch((err) =>{
        res.json(err)
    })
    if(!team) return
    const resp = await Resp.getRespById(team.id_resp).catch((err) =>{
        res.json(err)
    })
    if(!resp) return
    res.json(new Team(team, new Resp(resp)))
}

exports.create_a_team = async function(req,res){
    const number = await Team.createNewTeam(req.body.idResp, req.body.dept)
    res.json(number)
}