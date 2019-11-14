const express = require('express');
const cors = require('cors')
const helmet = require('helmet') // third-party secure middleware
const logger = require('./api/logger.js'); // custom logger middleware
const requiresAuth = require('./api/requires-auth-middleware.js');
const session = require('express-session'); // 1: npm i express-session
const KnexSessionStorage = require("connect-session-knex")(session); // <<<<<< for storing sessions in db

const registerRouter = require('./auth/registerRouter.js');
const loginRouter = require('./auth/loginRouter.js');
const usersRouter = require('./users/usersRouter.js');
// const restrictedRouter = require('./users/restrictedRouter.js');
const knexConnection = require("../database/dbConfig.js"); // for KnexSessionStorage


const server = express();

// 2: configure the sessions and cookies
const sessionConfiguration = {
    name: 'booger', // default name is sid
    secret: process.env.COOKIE_SECRET || 'is it secret? is it safe?',
    cookie: {
      maxAge: 1000 * 60 * 60, // valide for 1 hour (in milliseconds)
      secure: process.env.NODE_ENV === "development" ? false : true, // http for development (localhost), https for staging/production
      httpOnly: true, // prevent client javascript from accessing the cookie
    },
    resave: false, // save sessions even when they have not changed
    saveUninitialized: true, // read about it on the docs to respect GDPR
    // specific to session storage in your database
    store: new KnexSessionStorage({
      knex: knexConnection,
      clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
      tablename: "user_sessions",
      sidfieldname: "id", // defaults to sid otherwise
      createtable: true
    })
  };

// middeware
server.use(helmet());
server.use(express.json());
server.use(cors()); // research "credentials: true" and "withCredentials" when connecting from your react application
server.use(session(sessionConfiguration)) ; // 3 - use the session globally

// routes

server.get('/', logger('root api call'), (req, res) => {
    res.send('<h3>WEBAUTH-I-CHALLENGE</h3>')
});

server.use('/api/register', logger('registerRouter'), registerRouter);
server.use('/api/login', logger('loginRouter'), loginRouter);
server.use('/api/users', requiresAuth, logger('usersRouter'), usersRouter);
// server.use('/api/restricted', logger('restrictedRouter'), restrictedRouter);

// export
module.exports = server;