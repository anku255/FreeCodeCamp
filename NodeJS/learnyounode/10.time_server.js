// Your server should listen to TCP connections on the port provided by the  first
// argument to your  program. For each connection you must write the  current date & 24 hour
// time in the format: "YYYY-MM-DD hh:mm"

let net = require('net');

let port = process.argv[2];
let server = net.createServer((socket) => {

  const date = new Date();
  let timeNow = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}\n`;
  socket.end(timeNow);
});

server.listen(port);