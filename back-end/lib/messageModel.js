const sql = require('./db')
const User = require('./userModel').User

const Message = function (message,eMail) {
    this.sender = eMail
    this.content = message.content
    const date = message.date + ""
    const fullDate = date.split(" ")
    this.date = fullDate[0] + " " + fullDate[2] + " " + fullDate[1] + " " + fullDate[3]
    this.hour = fullDate[4]
}

Message.getMessages = function (me, you) {
    return new Promise(function (resolve, reject) {
        sql.query(`SELECT * FROM messages WHERE (id_sender = ${me.id} AND id_recipient = ${you.id}) OR (id_sender = ${you.id} AND id_recipient = ${me.id})ORDER BY date ASC;`,
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

Message.sendMessage = function (sender, recipient, content) {
    return new Promise(function (resolve, reject) {
        var d = new Date()
        var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
        var dateHour = date + " " + d.getHours() + ":" + d.getMinutes() +":" + d.getSeconds()
        sql.query(`INSERT INTO messages(id_sender, id_recipient, content, date) VALUES (${sender},${recipient},"${content}","${dateHour}")`,
        (err) =>{
            if(err){
                reject(err)
            }else 
                resolve("added")
        })
    })
}

module.exports = Message 

//sendmessages
