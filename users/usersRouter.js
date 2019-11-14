const router = require('express').Router();
// const bcrypt = require('bcrypt');

const Users = require('../auth/authModel.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
