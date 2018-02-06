{
    var app = require('express')();
    var server = require('http').createServer(app);
    var PORT = 3001;
    var io_1 = require('socket.io')(server);
    io_1.on('connection', function (client) {
        console.log(client);
        io_1.emit('test', 'data');
    });
    server.listen(PORT);
    console.log('Server has started at port 3001');
}
