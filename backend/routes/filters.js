import { Router } from "express";
import Age from "../models/Age.js";
import Animal from "../models/Animal.js";
import Breed from "../models/Breed.js";
import Location from "../models/Location.js";

const router = Router();

/* GET all filters */
router.get('/', async function(req, res, next) {
    try {
        let ages = await Age.find({}, { _id: 0, age: 1});
        let animals = await Animal.find({}, { _id: 0, animal: 1});
        let breeds = await Breed.find({}, { _id: 0, breed: 1});
        let locations = await Location.find({}, { _id: 0, location: 1});
        let ageFilter = [], animalFilter = [], breedFilter = [], locationFilter = [];
        ages.forEach(obj => { ageFilter.push(obj.age) });
        animals.forEach(obj => { animalFilter.push(obj.animal) });
        breeds.forEach(obj => { breedFilter.push(obj.breed) });
        locations.forEach(obj => { locationFilter.push(obj.location) });
        return res.status(200).json({ data: {
            ages: ageFilter,
            animals: animalFilter,
            breeds: breedFilter,
            locations: locationFilter,
        } });
	}
	catch (error) {
        console.log(error.message)
		return res.status(400).json({ error: "Get filters error" });
	}
});

export default router;
