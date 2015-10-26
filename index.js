var express = require('express');
var server = express();

server
  .use(express.static(__dirname))
  .listen(3000);

console.log('Visit me at http://localhost:3000');
