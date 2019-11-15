const router = require('express').Router();
// const bcrypt = require('bcrypt');

const Users = require('../auth/authModel.js');
const requiresAuth = require('../api/requires-auth-middleware.js');

router.post('/', requiresAuth, (req, res) => {
  let { username } = req.headers;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
