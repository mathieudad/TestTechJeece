var User = require('./userModel').User
var Resp = require('./userModel').Resp
const { read } = require('fs')
var Team = require('./teamModel')




exports.read_a_login = async function (req, res) {
    const user = await User.getUserByLogin(req.body.eMail, req.body.password).catch((err) => {
        res.json(err)
    })
    if (!user) return
    const team = await Team.getTeamById(user.id_team).catch((err) => {
        res.json(err)
    })
    if (!team) return
    const resp = await Resp.getRespById(team.id_resp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new User(user, new Team(team, new Resp(resp))))

}

async function getRealUsers(users){
    const realUsers = new Array()
    for (i = 0; i < users.length; i++) {
        const team = await Team.getTeamById(users[i].id_team).catch((err) => {
            return err
        })
        if (!team)
            return
        const resp = await Resp.getRespById(team.id_resp).catch((err) => {
            return err
        })
        if (!resp) return

        realUsers[i] = new User(users[i], new Team(team, new Resp(resp)))
    }
    return realUsers
}

//unused
exports.read_user_by_eMail = async function (req,res){
    const user = await User.getUserByEMail(req.body.eMail).catch((err) => {
        res.json(err)
    })
    if (!user) return
    const team = await Team.getTeamById(user.id_team).catch((err) => {
        res.json(err)
    })
    if (!team) return
    const resp = await Resp.getRespById(team.id_resp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new User(user, new Team(team, new Resp(resp))))
}


exports.read_users_by_name_dept_number = async function (req,res){
    if(!req.param("name") && !req.param("number"))
        res.json(await read_users_by_dept(req.param("dept")))
    else if(!req.param("name"))
        res.json(await read_user_by_dept_and_number(req.param("dept"), req.param("number")))
    else if(!req.param("number"))
        res.json(await read_user_by_name_and_dept(req.param("name").replace('_',' '), req.param("dept")))
    else
        res.json(await read_user_by_dept_and_number_and_name(req.param("name").replace('_',' '), req.param("dept"), req.param("number")))
}

async function read_users_by_dept(dept) {
    const users = await User.getUsersByDept(dept).catch((err) => {
        return err
    })
    if (!users) return
    return await getRealUsers(users)
}

async function read_user_by_name_and_dept(name, dept){
    const users = await User.getUserByLastOrFirstNameAndDept(name, dept).catch((err) =>{
        return err
    })
    if(!users) return 
    return await getRealUsers(users)
}

async function read_user_by_dept_and_number(dept, number){
    const users = await User.getUsersByTeam(dept, number).catch(
        (err)=>{
            return err
        })
        if(!users) return
        return await getRealUsers(users)
}

async function read_user_by_dept_and_number_and_name(name,dept,number){
    const users = await User.getUserByLastOrFirstNameAndDeptAndNumber(name,dept,number)
    .catch((err)=>{return err})
    if(!users) return
    return await getRealUsers(users)
}

//unused
exports.read_user_by_team= async function(req,res){
    const users = await User.getUserByTeam(req.body.number, req.body.dept).catch((err) =>{
        res.json(err)
    })
    if(!users) return 
    res.json(await getRealUsers(users))
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
exports.create_user = async function (req, res) {
    
    if (!req.body.create_team) {
        var rep = await create_a_user(req.body.firstName, req.body.lastName,
            req.body.password, req.body.passwordConfirm, req.body.dept, req.body.numberTeam)
        
    } else {
        var rep = await create_a_user_and_team(req.body.firstName, req.body.lastName,
            req.body.password, req.body.passwordConfirm, req.body.dept)
    }
    const user = await User.getUserByEMail(rep).catch((err) => {
        res.json(err)
    })
    if (!user) return
    const team = await Team.getTeamById(user.id_team).catch((err) => {
        res.json(err)
    })
    if (!team) return
    const resp = await Resp.getRespById(team.id_resp).catch((err) => {
        res.json(err)
    })
    if (!resp) return
    res.json(new User(user, new Team(team, new Resp(resp))))
}

exports.set_password = async function (req, res){
    const confirm = await User.setPassword(req.body.eMail, req.body.oldPassword, req.body.password, req.body.passwordConfirm)
    .catch((err) => {
        res.json(err)
    })

    if(confirm)
        res.json(confirm)
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