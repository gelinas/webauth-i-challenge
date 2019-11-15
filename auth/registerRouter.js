const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../auth/authModel.js');
// const requiresAuth = require('../api/requires-auth-middleware.js');

router.post('/', (req, res) => {
  let user = req.body;
  // read a password from the body
  // hash the password using bcryptjs
  const hash = bcrypt.hashSync(user.password, 12);  
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
