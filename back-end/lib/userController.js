var User = require('./userModel').User
var Resp = require('./userModel').Resp
const { getTeamById } = require('./teamModel')
var Team = require('./teamModel')

function getTeam(idTeam){
    Team.getTeamById(idTeam, function (err, team) {
        if (err){
            res.send(err)
            return
        }
        const resp = getResp(team.idResp)
        return new Team(team, resp)
    })
}

function getResp(idResp){
    Resp.getRespById(idResp, function (err, resp) {
        if (err){
            res.send(err)
            return
        }
        return new Resp(resp)
    })
}


exports.read_a_user = async function (req, res) {
    const user = await User.getUserById(req.params.userId).catch((err) =>{
        res.json(err)
    })
    if(!user) return
    const team = await Team.getTeamById(user.idTeam).catch((err) =>{
        res.json(err)
    })
    if(!team) return
    const resp = await Resp.getRespById(team.idResp).catch((err) =>{
        res.json(err)
    })
    if(!resp) return
    res.json(new User(user,new Team(team, new Resp(resp))))

/*
    User.getUserById(req.params.userId)
    .then((user) => {
        Team.getTeamById(user.idTeam)
        .then((team) => {
            Resp.getRespById(team.idResp)
            .then((resp) => {
                res.json(new User(user,new Team(team, new Resp(resp))))
            })
            .catch((err) =>{
                res.json(err)
            })
        })
        .catch((err) =>{
            res.json(err)
        })
    } )
    .catch((err) =>{
        res.json(err)
    })
    */
}


exports.read_a_login = function(req, res){
    User.getUserByLogin(req.body.eMail, req.body.password, function (err, user) {
        if (err){
            res.send(err)
            return
        }
        Team.getTeamById(user.idTeam, function (err, team) {
            if (err){
                res.send(err)
                return
            }
            Resp.getRespById(team.idResp, function (err, resp) {
                if (err){
                    res.send(err)
                    return
                }
            res.json(new User(user,new Team(team, new Resp(resp))))
            })
        })
    })
}

exports.create_a_user = function(req,res){
    User.createNewUser(req.body.firstName,req.body.lastName, function(err,user){
        if(err)
            res.send(err)
        
        res.json(user)
    })
}


/////resp

exports.read_a_resp = function (req, res) {
    Resp.getRespById(req.params.userId, function (err, resp) {
        if (err)
            res.send(err)

        res.json(resp)
    })
}