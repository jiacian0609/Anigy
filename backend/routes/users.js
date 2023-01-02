import dotenv from "dotenv-defaults";
dotenv.config();
import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from '../models/User.js'
import Post from "../models/Post.js";
import { authentication, updateDB } from '../utils/util.js';

const router = Router();

/* POST sign up */
router.post('/signUp', async function (req, res) {
	const username = req.body.username;
	let password = req.body.password;
	const email = req.body.email;
	const mobile = req.body.mobile;

	// Check whether the username and email exists
	let user = await User.find({ username: username })
	if(user[0]) {
		return res.status(400).json({ error: '使用者名稱已經使用過'})
	}
	user = await User.find({ email: email })
	if(user[0]) {
		return res.status(400).json({ error: 'Email 已經使用過'})
	}

	// Create a new user
	password = await bcrypt.hash(password, 10);
	try {
		const newUser = new User({ username, email, password, mobile })
		const addUser = await newUser.save();	
	}
	catch ( error ) {
		return res.status(500).json({ error: '註冊失敗'})
	}

	// Create jwt
	user = await User.find({ username: username })
	let user_id = user[0]._id
	var token = await jwt.sign(
		{
			Uid: user_id,
			Username: username,
			Email: email,
			Mobile: mobile
		},
		process.env.TOKEN_SECRET,
		{
			algorithm: 'HS256',
			expiresIn: "3h"
		}
	);

	// Return jwt
	return res.status(200).json({ message: '註冊成功', JWT: token})
});

/* POST sign in */
router.post('/signIn', async (req, res) => {
	try {
		const { username, password } = req.body;
		var encryptedPassword = null;
		
		// Check whether the username exists
		const user = await User.find({ username: username });
		if (user[0] === undefined) { 
			return res.status(400).json({ error: '使用者名稱不存在'});
		} else {
			encryptedPassword = user[0].password;
		}
		
		// Check whether the password is correct
		const compare = await bcrypt.compare(password, encryptedPassword);
		if(!compare)
			return res.status(403).json({ error: '密碼錯誤'});
		
		// Create jwt 
		var token = await jwt.sign(
			{
				Uid: user[0]._id,
				Username: username,
				Email: user[0].email,
				Mobile: user[0].mobile
			},
			process.env.TOKEN_SECRET,
			{
				algorithm: 'HS256',
				expiresIn: '2h'
			}
		);
		
		// Return jwt
		return res.status(200).send({ message: '登入成功', JWT: token})
	} catch (err) {
	  	console.error(err.message);
		return res.status(500).json({ error: '登入失敗'})
	}
  });

/* GET a user's info */
router.get('/', authentication(), async function(req, res, next)  {
	const user_id = req.user_id;

	try{
		if(!user_id)
			return res.status(403).json({ error: '請先登入' });
		
		const user = await User.find({ _id: user_id }, { password: 0 });
		return res.status(200).json({ message: '取得使用者資訊成功', info: user[0] })    
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ error: '取得使用者資訊失敗'})
	}
});

/* PATCH a user's info */
router.patch('/', authentication(), async function(req, res, next)  {
	const user_id = req.user_id;
	const { username, email, mobile} = req.body;

	try {
		if(!user_id)
			return res.status(403).json({ error: '請先登入' });
		
		// Update the user's info
		await User.updateOne({ _id: user_id }, {$set: { username, email, mobile }})

		// Update the user's contact info in post collection
		await Post.updateMany({ user_id, contact: 'mobile'}, { $set: { contact_content: mobile }})
		await Post.updateMany({ user_id, contact: 'email'}, { $set: { contact_content: email }})

		return res.status(200).json({ message: '修改使用者資訊成功'})
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({error: '修改使用者資訊失敗'})
	}
});

export default router;