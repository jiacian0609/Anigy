import { Router } from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router = Router();
/* signup */
router.post('/', async function (req, res) {
	console.log('start signup');
	const username = req.body.username;
	let password = req.body.password;
	const email = req.body.email;
	const mobile = req.body.mobile

	console.log(username, password, email, mobile);
	//Check whether the username and email exists
	let user = await User.find({ username: username })
	console.log(user[0]);
	if(user[0]) {
		console.log('??');
		return res.status(400).json({ error: 'Username exists.'})
	}
	user = await User.find({ email: email })
	if(user[0]) {
		console.log('???');
		return res.status(400).json({ error: 'email exists.'})
	}
		
	//Encrypt password
	console.log('encrypt');
	password = await bcrypt.hash(password, 10);
	console.log(password);
	//Insert data into DB
	try {
		const newUser = new User({ username, email, password, mobile })
		const addUser = await newUser.save();	
	}
	catch ( error ) {
		console.log(error.message );
		return res.status(400).json({ error: 'Add a user error'})
	}
	user = await User.find({username: username})
	console.log(user);
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
	res.send({'message': 'Sign up successfully.', 'JWT': token})

})

export default router;