import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

/* GET posts data */
router.get('/', async function(req, res, next) {
    const user_id = req.body.user_id;
    const post_id = req.body.post_id;
    const age = req.body.age;
    const sex = req.body.sex;
    const animal = req.body.animal;
    const location = req.body.location;

    try {
        let allPosts;
    
        if(user_id) // Case 1: by user_id
            allPosts= await Post.find({ user_id });
        else if(post_id) // Case 2: by post_id
            allPosts= await Post.find({ _id: post_id });
        else { // Case 3: by filter
            allPosts= await Post.find();
            allPosts = allPosts.filter((post) => age ? post.age === age : true)
            allPosts = allPosts.filter((post) => sex ? post.sex === sex : true)
            allPosts = allPosts.filter((post) => animal ? post.animal === animal : true)
            allPosts = allPosts.filter((post) => location ? post.location === location : true)
        } 

		return res.status(200).json({ data: allPosts });
	}
	catch (error) {
        //console.log(error.message)
		return res.status(400).json({ error: 'Get posts error' });
	}
});

router.post('/', function(req, res, next) {
    const { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, status, other_info, origin_url } = req.body

});

export default router;
