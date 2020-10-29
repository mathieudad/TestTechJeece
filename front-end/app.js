let http = require('http')
let url = require('url')
let EventEmitter = require('events')

let App = {
    start : function(port){
      let emitter = new EventEmitter()
  
      let server = http.createServer((request, response) => {
        if(request.url === '/'){
          emitter.emit('root',response)
        }
      }).listen(port)
  
      return emitter
    }
}

module.exports = App