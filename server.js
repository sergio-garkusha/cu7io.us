var express = require('express');
var server = express();

server
  .use(express.static(__dirname))
  .listen(3003);

console.log('Visit me at http://localhost:3003');
