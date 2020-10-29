let fs = require('fs')
let EventEmitter = require('events')

let app = require('./app').start(4000)
const nvx = new EventEmitter()

app.on('root', function(response){

  fs.readFile('index.html', (err,data) => {

    if (err) throw err
    
    response.writeHead(200, {
      'Content-type': 'text/html; charset=utf-8;'
    })

    response.end(data)

  })
})



