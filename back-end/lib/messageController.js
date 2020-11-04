var User = require('./userModel').User
var Resp = require('./userModel').Resp
var Team = require('./teamModel')
var Massage = require('./messageModel')
const Message = require('./messageModel')

async function getRealMessages(messages){
    const realMessages = new Array()
    for (i = 0; i < messages.length; i++) {
        realMessages[i] = new Message(messages[i])
    }
    return realMessages
}

exports.read_messages = async function(req,res){
    const messages = await Message.getMessages(req.body.senderMail, req.body.recipientMail)
    .catch((err)=> {
        res.json(err)
    })
    if(!messages) return
    res.json( await getRealMessages(messages))
}