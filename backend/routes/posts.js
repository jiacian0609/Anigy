import { Router } from "express";
import Post from "../models/Post.js";
import Age from "../models/Age.js";
import Animal from "../models/Animal.js";
import Breed from "../models/Breed.js";
import Location from "../models/Location.js";
import { authentication } from "../utils/util.js";

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
router.post('/', authentication(), async function(req, res, next) {
    const user_id = req.user_id;
    const { animal, color, age, sex, image, neutered, location, contact, status, other_info, origin_url } = req.body

    try {
        const newPost = new Post({ 
            user_id, 
            animal: animal ?? null, 
            color: color ?? null,
            age: age ?? null,
            sex: sex ?? null,
            image: image ?? null,
            neutered: neutered ?? null,
            location: location ?? null,
            contact: contact ?? null,
            status: status ?? null,
            other_info: other_info ?? null,
            origin_url: origin_url ?? null,
        });
        const addPost = await newPost.save();

        // Check whether a new age
        const existAge = await Age.find({ age });
        if(existAge.length === 0) {
            const newAge = new Age({ age });
            const addAge = await newAge.save();
        }

        // Check whether a new animal
        const existAnimal = await Animal.find({ animal });
        if(existAnimal.length === 0) {
            const newAnimal = new Animal({ animal });
            const addAnimal = await newAnimal.save();
        }

        // Check whether a new breed
        /* const existBreed = await Breed.find({ breed });
        if(existBreed.length === 0) {
            const newBreed = new Breed({ breed });
            const addBreed = await newBreed.save();
        } */

        // Check whether a new location
        const existLocation = await Location.find({ location });
        if(existLocation.length === 0) {
            const newLocation = new Location({ location });
            const addLocation = await newLocation.save();
        }


		return res.status(200).json({ data: addPost, message: 'Add Success' });
	}
	catch (error) {
        console.log(error.message)
		return res.status(400).json({ error: 'Add a post error' });
	}
});

/* PATCH a post */
router.patch('/:post_id', authentication(), async function(req, res, next) {
    const user_id = req.user_id;
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
router.delete('/:post_id', authentication(), async function(req, res, next) {
    const user_id = req.user_id;
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
