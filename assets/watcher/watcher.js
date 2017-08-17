const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.get('/', function(req, res){
        res.sendFile(__dirname + '/watcher.ts');
});

io.on('connection',function (client) {
        console.log("connection");
});

fs.watch(__dirname + '/watcher.ts', function(curr, prev) {
        console.log("file changed");
        io.emit('file-changed', '');
});

http.listen(22280, function(){
        console.log('listening');
});