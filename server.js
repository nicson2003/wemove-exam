/* eslint-disable no-undef */
const fs = require('fs');
const http = require('http');
const https = require('https');
logger = require('./middleware/logger.js');
const privateKey = fs.readFileSync('./cert/key.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const httpPort = process.env.HTTPS_PORT || 4001;
const httpsPort = process.env.HTTPS_PORT || 5001;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use(require('morgan')('combined', { stream: logger.stream }));

// your express configuration here
app.get('/', function (req, res) {
  res.send('api is running');
});

app.use('/api/message', require('./routes/api/messageRest'));
app.use('/api/multiples', require('./routes/api/multiples'));
app.use('/api/palindrome', require('./routes/api/palindrome'));
app.use('/api/hexadecimal', require('./routes/api/hexadecimal'));
app.use('/api/permutation', require('./routes/api/permutation'));

app.use('/api/fibonacci', require('./routes/api/fibonacci'));

app.get('/', (req, res) => {
  console.log(process.env.ENVIRONMENTS);
  res.send(process.env.API_WORKS_MESSAGE);
});

// request to handle undefined or all other routes
app.get('*', (req, res) => {
  res.send(process.env.API_WORKS_MESSAGE);
});

console.log('environment::::::', process.env.ENVIRONMENTS);
console.log('DB_CONNECTION_STR:::::::::::::', process.env.DB_CONNECTION_STR);
console.log('DB USERNAME::::::', process.env.DB_USERNAME);
console.log('DB PASSWORD::::::', process.env.DB_PASSWORD);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, function () {
  console.log(
    'app is listening on port ' +
      httpPort +
      ' Go to http://localhost:' +
      httpPort
  );
});
httpsServer.listen(httpsPort, function () {
  console.log(
    'app is listening on port ' +
      httpsPort +
      ' Go to https://localhost:' +
      httpsPort
  );
});
