const express = require('express');

const apiRouter = express();

apiRouter.use('/message', require('./messageRest'));
apiRouter.use('/multiples', require('./multiples'));
//apiRouter.use('/palindrome', require('./palindrome'));
//apiRouter.use('/fibonacci', require('./fibonacci'));
//apiRouter.use('/hexadecimal', require('./hexadecimal'));
//apiRouter.use('/permutation', require('./permutation'));

module.exports = apiRouter;
