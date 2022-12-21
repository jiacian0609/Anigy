import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

/* GET all posts data with user_id*/
router.get('/', async function(req, res, next) {
    /* TODO: add user authentication */
    // const user_id = null;

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
router.get('/:post_id', async function(req, res, next) {
    const { post_id } = req.params

    try {
        let post = await Post.find({ _id: post_id });
        return res.status(200).json({ data: post[0] });
	}
	catch (error) {
        //console.log(error.message)
		return res.status(400).json({ error: 'Get a post error' });
	}
});

/* POST a new post */
router.post('/', async function(req, res, next) {
    const { user_id, animal, color, age, sex, image, neutered, location, contact, status, other_info, origin_url } = req.body

    try {
        const newPost = new Post({ user_id, animal, color, age, sex, image, neutered, location, contact, status, other_info, origin_url });
        const addPost = await newPost.save();
		return res.status(200).json({ data: addPost, message: 'Add Success' });
	}
	catch (error) {
        //console.log(error.message)
		return res.status(400).json({ error: 'Add a post error' });
	}
});

/* PATCH a post */
router.patch('/:post_id', async function(req, res, next) {
    /* TODO: add user authentication */
    // const user_id = null;
    const { post_id } = req.params
    const { animal, color, age, sex, image, neutered, location, contact, status, other_info, origin_url } = req.body

    try {
        await Post.updateOne({ _id: post_id }, { $set: { animal, color, age, sex, image, neutered, location, contact, status, other_info, origin_url }});
		return res.status(200).json({ message: 'Update Success' });
	}
	catch (error) {
        //console.log(error.message)
		return res.status(400).json({ error: 'Update a post error' });
	}
});

/* DELETE a new post */
router.delete('/:post_id', async function(req, res, next) {
    /* TODO: add user authentication */
    // const user_id = null;
    const { post_id } = req.params

    try {
        const deletePost = await Post.deleteOne({ _id: post_id });
		return res.status(200).json({ message: 'Delete Success' });
	}
	catch (error) {
        //console.log(error.message)
		return res.status(400).json({ error: 'Delete a post error' });
	}
});

export default router;
