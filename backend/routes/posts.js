import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

router.get('/', async function(req, res, next) {
    try {
		const allPosts = await Post.find();
		return res.status(200).send(allPosts);
	}
	catch (e) {
		return res.status(400).send({ message: "Database failed" });
	}
});

router.post('/', function(req, res, next) {
    const { animal, breed, color, age, sex, cover_image, images, neutered, location, contact, status, other_info, origin_url } = req.body

});

export default router;
