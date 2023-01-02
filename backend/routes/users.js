import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from '../models/User.js'
import { authentication, updateDB } from '../utils/util.js';

const router = Router();

// sign up
router.post('/signUp', async function (req, res) {
	const username = req.body.username;
	let password = req.body.password;
	const email = req.body.email;
	const mobile = req.body.mobile
	//Check whether the username and email exists
	let user = await User.find({ username: username })
	if(user[0]) {
		return res.status(400).json({ error: '使用者名稱已經使用過'})
	}
	user = await User.find({ email: email })
	if(user[0]) {
		return res.status(400).json({ error: 'email已經使用過'})
	}
	password = await bcrypt.hash(password, 10);
	try {
		const newUser = new User({ username, email, password, mobile })
		const addUser = await newUser.save();	
	}
	catch ( error ) {
		return res.status(400).json({ error: '註冊失敗'})
	}
	user = await User.find({username: username})
	let user_id = user[0]._id
	//Create token
	var token = await jwt.sign(
		{
			Uid: user_id,
			Username: username,
			Email: email,
			Mobile: mobile
		},
		"b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
		{
			algorithm: 'HS256',
			expiresIn: "3h"
		}
	);
	//Store token in cookie
	res.send({'message': '註冊成功', 'JWT': token})
});

// sign in
router.post('/signIn', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('name, password: ', username, password);
      var encryptedPassword = null;
  
      const user = await User.find({ username: username })
      if ( user[0] === undefined) { 
        return res.status(404).send('使用者名稱不存在');
      } else {
        console.log('?');
        encryptedPassword = user[0].password;
      }
  
      const compare = await bcrypt.compare(password, encryptedPassword)
      if(!compare)//比對加密前後
        return res.status(403).send('密碼錯誤');
   
      var token = await jwt.sign(
        {
          Uid: user[0]._id,
          Username: username,
          Email: user[0].email,
          Mobile: user[0].mobile
        },
        "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
        {
          algorithm: 'HS256',
          expiresIn: '2h'
        }
      );
  
      res.send({'message': '登入成功', 'JWT': token})
    } catch (err) {
      console.error(err.message);
    }
  });

//get user info
router.get('/', authentication(), async function(req, res, next)  {
    try{
        const user_id = req.user_id;
        const user = await User.find({ _id: user_id })
        res.send({'message': '成功找到使用者資訊', 'info': user[0]})    
    } catch (err) {
        console.error(err.message)
    }
});
//patch user info
router.patch('/', authentication(), async function(req, res, next)  {
    const user_id = req.user_id;
    const { username, email, mobile} = req.body;
    try {
        
        const updateUser = await User.updateOne({ _id: user_id }, {$set: { username, email, mobile }})
        if(updateUser.modifiedCount === 0) {
            return res.status(403).json({error: '更新失敗'})
        }
        else {
            updateDB();
            return res.status(200).json({ message: '更新成功'})
        }
    } catch (err) {
        return res.status(400).json({error: '更新失敗'})
    }
});
export default router;