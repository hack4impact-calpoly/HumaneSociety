/* eslint-disable  */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const { makeToken } = require('../token');
require('dotenv').config();

const User = require('../models/user');

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { user, email, password } = req.body;

  const userObj = User;
  console.log('logging in...');

  userObj.findOne({ email }).then((result) => {
    if (!result) {
      console.log('Invalid email');
      res.status(404).send('Invalid email');
    } else if (bcrypt.compareSync(password, result.password)) {
      console.log('logged in');
      // prepare login data
      const { userID } = result;
      const data = {
        email,
        user,
        userID,
      };
      // make login token
      const token = makeToken(data);
      result.token = token;
      res.status(200).send({ result, token });
    } else {
      res.status(404).send('Invalid email/password');
    }
  });
});

module.exports = router;
