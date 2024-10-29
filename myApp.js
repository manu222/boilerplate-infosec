const express = require('express');
const app = express();
const helmet = require('helmet');



//hide Xpress using helmet
app.use(helmet.hidePoweredBy());

//prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));
//prevent XSS protection
app.use(helmet.xssFilter());

//prevent MIME sniffing
app.use(helmet.noSniff());

//Untrusted HTML 
app.use(helmet.ieNoOpen());

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port : ${port}`);
});




