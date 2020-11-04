const sql = require('./db')
const User = require('./userModel').User

const Message = function (message) {
    this.content = message.content
    const date = message.date + ""
    console.log(date)
    const fullDate = date.split(" ")
    this.date = fullDate[0] + " " + fullDate[2] + " " + fullDate[1] + " " + fullDate[3]
    this.hour = fullDate[4]
}

Message.getMessages = function (senderMail, recipientMail) {
    return new Promise(async function (resolve, reject) {
        const sender = await User.getUserByEMail(senderMail)
    .catch((err) =>{
        reject("sender "+err)
    })
    if(!sender) return
    const recipient = await User.getUserByEMail(recipientMail)
    .catch((err)=> {
        reject("recipient "+err)
    })
    if(!recipient) return
        sql.query(`SELECT * FROM messages WHERE id_sender = ${sender.id} AND id_recipient = ${recipient.id};`,
            (err, res) => {
                if (err){
                    reject(err)
                    return
                }
                else if(res.length){
                    resolve(res)
                    return
                }
                else{
                    reject("no messages between this two users")
                    return
                }
            })
    })
}

Message.sendMessages = function (sender, recipient, content, date) {

}

module.exports = Message 

//sendmessages
