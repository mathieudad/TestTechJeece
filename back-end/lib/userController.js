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

}/* 

async function mapUser(user) {
    return new Promise( async function (resolve, reject) {
            const team = await Team.getTeamById(user.idTeam).catch((err) => {
                reject(err)
                return err
            })
            if (!team) {
                reject(err)
                return err
            }
            const resp = await Resp.getRespById(team.idResp).catch((err) => {
                reject(err)
                return err
            })
            if (!resp) return
            //console.log(new User(user, new Team(team, new Resp(resp))))
            console.log(new User(user, new Team(team, new Resp(resp))))
           const users1 = new User(user, new Team(team, new Resp(resp)))
        resolve(users1)
    })
} */

exports.read_users_by_dept = async function (req, res) {
    const users = await User.getUsersByDept(req.params.dept).catch((err) => {
        res.json(err)
    })
    if (!users) return
    const realUsers = new Array()
    for (i = 0; i < users.length; i++) {
        const team = await Team.getTeamById(users[i].idTeam).catch((err) => {
            return err
        })
        if (!team)
            return
        const resp = await Resp.getRespById(team.idResp).catch((err) => {
            return err
        })
        if (!resp) return

        realUsers[i] = new User(users[i], new Team(team, new Resp(resp)))
    }
    res.json(realUsers)
}


exports.create_user = async function (req, res) {
    if (req.body.createTeam) {
        const rep = await create_a_user(req.body.firstName, req.body.lastName,
            req.body.password, req.body.passwordConfirm, req.body.dept, req.body.numberTeam)
        res.json(rep)
    } else {
        const rep = await create_a_user_and_team(req.body.firstName, req.body.lastName,
            req.body.password, req.body.passwordConfirm, req.body.dept)
        res.json(rep)
    }
}

async function create_a_user(firstName, lastName, password, passwordConfirm, dept, numberTeam) {
    const eMail = await User.createNewUser(firstName, lastName, password, passwordConfirm, dept, numberTeam)
        .catch((err) => {
            return err
        })
    return (eMail)

}

async function create_a_user_and_team(firstName, lastName,
    password, passwordConfirm, dept) {
    const user = await User.createNewUserAndTeam(firstName, lastName,
        password, passwordConfirm, dept).catch((err) => {
            return err
        })
    return user

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