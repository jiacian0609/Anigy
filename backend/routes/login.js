import { Router } from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = Router();

/* POST login info. */
router.post('/', async (req, res) => {
  console.log('start login');
  try {
    const { username, password } = req.body;
    console.log('name, password: ', username, password);
    var encryptedPassword = null;

    //check the user
    const user = await User.find({ username: username })
    if ( user.rows[0] === undefined) { 
      return res.status(404).send('Username does not exist.');
    } else {
      encryptedPassword = user.rows[0].password;
    }

    //check the password
    const compare = await bcrypt.compare('test', encryptedPassword)
    if(!compare)//比對加密前後
      return res.status(403).send('Password is wrong :(');
 
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

    res.send({'message': 'Login successfully.', 'JWT': token})
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
