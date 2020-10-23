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


/////resp
//unused for the moment
exports.read_a_resp = async function (req, res) {
    const resp = await Resp.getRespById(req.param.idResp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new Resp(resp))
}