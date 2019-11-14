const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../auth/authModel.js');

// DAY 1 CODE: using credentials in HTTP headers
// const requiresAuth = require('../api/requires-auth-middleware.js');

// router.post('/', requiresAuth, (req, res) => {
//   let { username } = req.headers;
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user) {
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });


router.post('/', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    // with sessions and cookies
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username; // << good: add properties to existing session object
        // req.session = { username: user.username } // bad panda: don't override the session object
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
