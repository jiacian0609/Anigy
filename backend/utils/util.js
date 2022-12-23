import dotenv from "dotenv-defaults";
dotenv.config();
import jwt from 'jsonwebtoken'
import Post from "../models/Post.js";
import Age from "../models/Age.js";
import Animal from "../models/Animal.js";
import Location from "../models/Location.js";

const authentication = () => {
    return async function (req, res, next) {
        var JWT = req.headers.authorization
        JWT = JWT.replace('Bearer ', '');
        var payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
        req.user_id = payload.Uid;
        next();
        //var user_id = payload.Uid;
        /* let accessToken = req.get('Authorization');
        if (!accessToken) {
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        try {
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
            console.log(user)
            if (roleId == null) {
                next();
            } else {
                let userDetail;
                if (roleId == User.USER_ROLE.ALL) {
                    userDetail = await User.getUserDetail(user.email);
                } else {
                    userDetail = await User.getUserDetail(user.email, roleId);
                }
                if (!userDetail) {
                    res.status(403).send({error: 'Forbidden'});
                } else {
                    req.user.id = userDetail.id;
                    req.user.role_id = userDetail.role_id;
                    next();
                }
            }
            return;
        } catch(err) {
            console.log(err)
            res.status(403).send({error: 'Forbidden'});
            return;
        }*/
    }; 
};

const updateDB = async () => {
    let posts = await Post.find();
    let ages = await Age.find();
    let animals = await Animal.find();
    let locations = await Location.find();
    let allAges = [], allAnimals = [], allLocations = [];
    ages.forEach(obj => { allAges.push(obj.age) });
    animals.forEach(obj => { allAnimals.push(obj.animal) });
    locations.forEach(obj => { allLocations
        .push(obj.location) });
    console.log(allAges)
    console.log(allAnimals)
    console.log(allLocations)

    /* // Check whether a new age
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
    const existBreed = await Breed.find({ breed });
    if(existBreed.length === 0) {
        const newBreed = new Breed({ breed });
        const addBreed = await newBreed.save();
    }

    // Check whether a new location
    const existLocation = await Location.find({ location });
    if(existLocation.length === 0) {
        const newLocation = new Location({ location });
        const addLocation = await newLocation.save();
    } */
};

export { authentication, updateDB };