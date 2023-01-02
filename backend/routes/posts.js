import { Router } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { authentication, updateDB } from "../utils/util.js";

const router = Router();

/* GET all posts data with user_id*/
router.get('/', authentication(), async function(req, res, next) {
	const user_id = req.user_id;

	try {
		let posts = await Post.find({ user_id });
		return res.status(200).json({ data: posts });
	}
	catch (error) {
		console.log(error.message)
		return res.status(400).json({ error: "Get user's posts error" });
	}
});

/* GET all posts data */
router.get('/all', async function(req, res, next) {
	try {
		let posts = await Post.find();
		return res.status(200).json({ data: posts });
	}
	catch (error) {
		//console.log(error.message)
		return res.status(400).json({ error: 'Get all posts error' });
	}
});

/* GET a post data by post_id */
router.get('/:post_id', authentication(), async function(req, res, next) {
	const user_id = req.user_id;
	const { post_id } = req.params

	try {
		let post = await Post.find({ _id: post_id });
		let role = post[0].user_id === user_id ? 'WRITE' : 'READ';
		return res.status(200).json({ 
			data: post[0],
			role,
		});
	}
	catch (error) {
		//console.log(error.message)
		return res.status(400).json({ error: 'Get a post error' });
	}
});

/* POST a new post */
router.post('/', authentication(), async function(req, res, next) {
	const user_id = req.user_id;
	const { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, other_info, origin_url } = req.body

	try {
		if(!user_id)
			return res.status(403).json({ error: '請先登入以新增貼文' });

		// Check the necessary variables
		if(!animal || !breed || !color || !age || !sex || !cover_image || !neutered || !location || !contact)
			return res.status(400).json({ error: '請輸入必填欄位' });
		
		// Add a new post
		let user = await User.find({ _id: user_id });
		const newPost = new Post({ 
			user_id,
			animal: animal ?? null, // necessary
			breed: breed ?? null, // necessary
			color: color ?? null, // necessary
			age: age ?? null, // necessary
			sex: sex ?? null, // necessary
			cover_image: cover_image ?? null, // necessary
			images: images ?? [],
			neutered: neutered ?? null, // necessary
			location: location ?? null, // necessary
			contact: contact ?? null, // necessary
			contact_content: contact === 'mobile' ? user[0].mobile : user[0].email,
			status: '待領養',
			other_info: other_info ?? null,
			origin_url: origin_url ?? null,
		});
		const addPost = await newPost.save();
		updateDB();

		return res.status(200).json({ data: addPost, message: '新增貼文成功' });
	}
	catch (error) {
		console.log(error.message)
		return res.status(500).json({ error: '新增貼文失敗' });
	}
});

/* PATCH a post */
router.patch('/:post_id', authentication(), async function(req, res, next) {
	const user_id = req.user_id;
	const { post_id } = req.params
	const { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, status, other_info, origin_url } = req.body

	try {
		const updatePost = await Post.updateOne({ _id: post_id, user_id }, { $set: { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, status, other_info, origin_url }});
		if(updatePost.matchedCount === 0) {
			return res.status(403).json({ error: 'Update Forbidden' });
		}
		else {
			updateDB();
			return res.status(200).json({ message: 'Update Success' });
		}
	}
	catch (error) {
		//console.log(error.message)
		return res.status(400).json({ error: 'Update a post error' });
	}
});

/* DELETE a new post */
router.delete('/:post_id', authentication(), async function(req, res, next) {
	const user_id = req.user_id;
	const { post_id } = req.params

	try {
		const deletePost = await Post.deleteOne({ _id: post_id, user_id });
		if(deletePost.deletedCount === 0) {
			return res.status(403).json({ error: 'Delete Forbidden' });
		}
		else {
			updateDB();
			return res.status(200).json({ message: 'Delete Success' });
		}
	}
	catch (error) {
		//console.log(error.message)
		return res.status(400).json({ error: 'Delete a post error' });
	}
});

export default router;
