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
		return res.status(500).json({ error: "取得使用者貼文失敗" });
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
		return res.status(500).json({ error: '取得全部貼文失敗' });
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
		return res.status(500).json({ error: '取得貼文失敗' });
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
			animal: animal, // necessary
			breed: breed, // necessary
			color: color, // necessary
			age: age, // necessary
			sex: sex, // necessary
			cover_image: cover_image, // necessary
			images: images ?? [],
			neutered: neutered, // necessary
			location: location, // necessary
			contact: contact, // necessary
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
		let user = await User.find({ _id: user_id });
		const contact_content = contact === 'mobile' ? user[0].mobile : user[0].email;
		const updatePost = await Post.updateOne({ _id: post_id, user_id }, { $set: { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, contact_content, status, other_info, origin_url }});
		if(updatePost.matchedCount === 0) {
			return res.status(403).json({ error: '請先登入以修改貼文' });
		}
		else {
			updateDB();
			return res.status(200).json({ message: '修改貼文成功' });
		}
	}
	catch (error) {
		//console.log(error.message)
		return res.status(500).json({ error: '修改貼文失敗' });
	}
});

/* DELETE a new post */
router.delete('/:post_id', authentication(), async function(req, res, next) {
	const user_id = req.user_id;
	const { post_id } = req.params

	try {
		const deletePost = await Post.deleteOne({ _id: post_id, user_id });
		if(deletePost.deletedCount === 0) {
			return res.status(403).json({ error: '請先登入以刪除貼文' });
		}
		else {
			updateDB();
			return res.status(200).json({ message: '刪除貼文成功' });
		}
	}
	catch (error) {
		//console.log(error.message)
		return res.status(500).json({ error: '刪除貼文失敗' });
	}
});

export default router;
