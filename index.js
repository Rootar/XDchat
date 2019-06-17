var express = require('express');
  app = express();
  server = require('http').createServer(app);
  io = require('socket.io').listen(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.urlencoded())

server.listen(process.env.PORT || 3000);



emailA = 'A@A.A'
passwordA = 'alfred'

emailB = 'B@B.B'
passwordB = 'bartek'

currUser ="";

app.get('/',function(req,res){
  res.sendFile(__dirname+'/login.html');
});

app.post('/', function(req, res){
  console.log(req.body.email)
  console.log(req.body.password)

  if(req.body.email == emailA && req.body.password == passwordA){
    res.status(301).redirect('/ALFRED');
    currUser="ALFRED"
  }

  if(req.body.email == emailB && req.body.password == passwordB){
      res.status(301).redirect('/BARTEK');
    currUser="BARTEK"
  }
})

app.get('/ALFRED',function(req,res){
  res.sendFile(__dirname+'/chat.html');
});

app.get('/BARTEK',function(req,res){
  res.sendFile(__dirname+'/chat.html');
});


io.sockets.on('connection', function (socket) {
    console.log("Socket connected.");
    socket.on('message', function(msg, path){
        io.emit('message',msg, path); 
        console.log(msg);     
    });
});