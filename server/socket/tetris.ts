{
  const app = require('express')();
  const server = require('http').createServer(app);
  const PORT = 3001;
  const io = require('socket.io')(server);
  io.on('connection', (client: any) => {
    console.log(client);
    io.emit('test', 'data');
  });
  server.listen(PORT);
  console.log('Server has started at port 3001');
}