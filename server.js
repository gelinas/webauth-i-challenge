const express = require('express');
const cors = require('cors')
const helmet = require('helmet') // third-party secure middleware
const logger = require('./api/logger.js'); // custom logger middleware

const registerRouter = require('./auth/registerRouter.js');
const loginRouter = require('./auth/loginRouter.js');
const usersRouter = require('./users/usersRouter.js');
// const restrictedRouter = require('./users/restrictedRouter.js');

const server = express();

// middeware
server.use(helmet());
server.use(cors());
server.use(express.json());

// routes

server.get('/', logger('root api call'), (req, res) => {
    res.send('<h3>WEBAUTH-I-CHALLENGE</h3>')
});

server.use('/api/register', logger('registerRouter'), registerRouter);
server.use('/api/login', logger('loginRouter'), loginRouter);
server.use('/api/users', logger('usersRouter'), usersRouter);
// server.use('/api/restricted', logger('restrictedRouter'), restrictedRouter);

// export
module.exports = server;