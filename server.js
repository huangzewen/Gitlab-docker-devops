var http = require('http')
var exec = require('exec')
const PORT = 9988
const PATH = '/home/zewenh/nodeserver/project/'

var deployServer = http.createServer(function(request, response){
  if(request.url.search(/deploy\/?$/i) > 0) {
    var datetime = new Date().toLocaleString()
    var commands = [
      'cd ' + PATH,
      'git clone http://127.0.0.1:8000/huangzewen/myFirstGItProj.git || ( cd myFirstGItProj; git pull origin; mvn clean compile assembly:single )',
      'cd ' + PATH,
      'echo synchronize project at ' + datetime + ' >> log'
    ].join(' && ')

    exec(commands, function(err, out, code){
    if (err instanceof Error) {
      response.writeHead(500)
      response.end('Server Internal Error.') 
      throw err
    } 
    process.stderr.write(err)
    process.stdout.write(out)
    response.writeHead(200)
    response.end('Deploy Done.') 
     
    })
  } else {
    response.writeHead(404)
    response.end('Not Found.')
  }
})

deployServer.listen(PORT)
