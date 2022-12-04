var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const pool = require('../db');
var jwt = require("jsonwebtoken");

/* POST login info. */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('name, password: ', username, password);
    var encryptedPassword = null;

    const user = await pool.query('SELECT * FROM ')
    await new Promise((resolve, reject) => {
      if ( user.rows[0] === undefined) {
        return res.status(404).send('Username does not exist.');
      } else {
        encryptedPassword = user.rows[0].password;
      }
      resolve()
    })

    await new Promise((resolve, reject) => {
      if(!(password === encryptedPassword))
        return res.status(403).send('Password is wrong :(');
      resolve()
    });

    await new Promise(async (resolve, reject) => {
      token = await jwt.sign(
        {
          Uid: user.rows[0].user_id,
          Username: username,
          Email: user.rows[0].Email
        },
        "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
        {
          algorithm: 'HS256',
          expiresIn: '2h'
        }
      );
      resolve()
    })

    await new Promise((resolve, reject) => {
      res.send({'message': 'Login successfully.', 'JWT': token})
      resolve()
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
