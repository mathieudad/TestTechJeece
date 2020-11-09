var User = require('./userModel').User
const Message = require('./messageModel')

async function getRealMessages(messages,me,you){
    const realMessages = new Array()
    for (i = 0; i < messages.length; i++) {
        if(messages[i].id_sender === me.id)
            realMessages[i] = new Message(messages[i], me.e_mail)
        else 
            realMessages[i] = new Message(messages[i], you.e_mail)
    }
    return realMessages
}

exports.read_messages = async function(req,res){
    const me = await User.getUserByEMail(req.params.me)
    .catch((err) =>{
        reject("sender "+err)
    })
    if(!me) return
    const you = await User.getUserByEMail(req.params.you)
    .catch((err)=> {
        reject("recipient "+err)
    })
    if(!you) return
    const messages = await Message.getMessages(me, you)
    .catch((err)=> {
        res.json(err)
    })
    if(!messages) return
    res.json( await getRealMessages(messages,me,you))
}

exports.write_messages = async function(req,res){
    const sender = await User.getUserByEMail(req.body.senderMail)
    .catch((err) =>{
        reject("sender "+err)
    })
    if(!sender) return
    const recipient = await User.getUserByEMail(req.body.recipientMail)
    .catch((err)=> {
        reject("recipient "+err)
    })
    if(!recipient) return
    const test = await Message.sendMessage(sender.id, recipient.id, req.body.content)
    .catch((err)=> {
        res.json(err)
    })
    res.json(test)
}