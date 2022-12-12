import { Router } from 'express';
import User from '../models/User.js'
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

const router = Router();
/* signup */
router.post('/', async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const show_mobile = req.body.show_mobile;
	const show_email = req.body.show_email;

	//Check whether the username and email exists
	let user = await User.find({ username })
	if(user) 
		return res.status(400).json({ error: 'Username exists.'})
	user = await User.find({ email })
	if(user) 
		return res.status(400).json({ error: 'email exists.'})
	//Encrypt password
	var encryptedPassword = await bcrypt.hash(password, 10);
	//Insert data into DB
	try {
		const newUser = new User({ user_id, username, password, email, show_mobile, show_email })
		const addUser = await User.save();	
	}
	catch ( error ) {
		console.log(error.message );
		return res.status(400).json({ error: 'Add a user error'})
	}
	
	//Create token
	var token = await jwt.sign(
		{
			Uid: user_id,
			Username: username,
			Email: email,
			show_mobile: show_mobile,
			show_email: show_email
		},
		"b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
		{
			algorithm: 'HS256',
			expiresIn: "3h"
		}
	);

	//Store token in cookie
	res.cookie('jwt', token, { httpOnly: true, secure: true });
	//res.send(token)

	res.send("Sign up successfully.");
	
	/* Check input correctness
	req.checkBody('username', 'user name is required').Notempty()
	req.checkBody('password', 'password is required').Notempty()
	req.checkBody('email', 'email is required').Notempty()
	req.checkBody('email', 'email is not vaild').isEmail()
	
	let errors = req.validationErrors();

	if(errors){
		res.render('signup', {
			errors:errors
		});
	} else{
		let newUser = new User({
			username:username,
			password:password,
			email:email
		});
	}
	*/

	//應該不用bcrypt加密吧 D:
	//req.flash('success', 'You are now signed up and can login');
	//res.redirect('/login');
})

module.exports = router;