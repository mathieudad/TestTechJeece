var User = require('./userModel').User
var Resp = require('./userModel').Resp
const { getTeamById } = require('./teamModel')
var Team = require('./teamModel')


exports.read_a_user = async function (req, res) {
    const user = await User.getUserById(req.params.userId).catch((err) => {
        res.json(err)
    })
    if (!user) return
    const team = await Team.getTeamById(user.idTeam).catch((err) => {
        res.json(err)
    })
    if (!team) return
    const resp = await Resp.getRespById(team.idResp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new User(user, new Team(team, new Resp(resp))))
}

exports.read_a_login = async function (req, res) {
    const user = await User.getUserByLogin(req.body.eMail, req.body.password).catch((err) => {
        res.json(err)
    })
    if (!user) return
    const team = await Team.getTeamById(user.idTeam).catch((err) => {
        res.json(err)
    })
    if (!team) return
    const resp = await Resp.getRespById(team.idResp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new User(user, new Team(team, new Resp(resp))))

}

exports.read_users_by_dept = async function(req,res){
    const users = await User.getUsersByDept(req.params.dept).catch((err) => {
        res.json(err)
    })
    if (!users) return
    var realUsers = new Array()
    var i= 0
    users.map(async user => {
        const team = await Team.getTeamById(user.idTeam).catch((err) => {
            res.json(err)
        })
        if (!team) return
        const resp = await Resp.getRespById(team.idResp).catch((err) => {
            res.json(err)
        })
        if (!resp) return
        //console.log(new User(user, new Team(team, new Resp(resp))))
        
        realUsers[i] = new User(user, new Team(team, new Resp(resp)))
        i-= -1
        console.log(i, realUsers[i-1])
    })
    console.log('hey')
    res.json(realUsers) 
}

exports.create_a_user = async function (req, res) {
    const email = await User.createNewUser(req.body.firstName, req.body.lastName).catch((err) => {
        res.json(err)
    })
    res.json(email)

}

exports.create_a_user = async function (req, res) {
    const eMail = await User.createNewUser(req.body.firstName, req.body.lastName,
        req.body.password, req.body.passwordConfirm, req.body.dept, req.body.numberTeam)
        .catch((err) => {
            res.json(err)
        })
    res.json(eMail)

}

exports.create_a_user_and_team = async function (req, res) {
    const user = await User.createNewUserAndTeam(req.body.firstName, req.body.lastName,
        req.body.password, req.body.passwordConfirm, req.body.dept).catch((err) => {
            res.json(err)
        })
    res.json(user)

}


/////resp
//unused for the moment
exports.read_a_resp = async function (req, res) {
    const resp = await Resp.getRespById(req.param.idResp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new Resp(resp))
}