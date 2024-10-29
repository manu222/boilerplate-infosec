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
//HTTP Strict Transport Security (HSTS)
//maxAge is set to 90 days in seconds, force is set to true to force HTTPS connection 
app.use(helmet.hsts({maxAge: 90*24*60*60, force: true}));
//Untrusted HTML 
app.use(helmet.ieNoOpen());
//DNS Prefetch Control
app.use(helmet.dnsPrefetchControl());
//no cache, disable caching in the browser 
app.use(helmet.noCache());
//Content Security Policy
app.use(helmet.contentSecurityPolicy({ directives: {
   defaultSrc: ["'self'"],
   scriptSrc: ["'self'", "trusted-cdn.com"] 
  } 
}));


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




