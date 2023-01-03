import dotenv from "dotenv-defaults";
dotenv.config();
import jwt from 'jsonwebtoken'
import Post from "../models/Post.js";
import Age from "../models/Age.js";
import Animal from "../models/Animal.js";
import Location from "../models/Location.js";

const authentication = () => {
    return async function (req, res, next) {
        try {
            var JWT = req.headers.authorization
            JWT = JWT.replace('Bearer ', '');
            var payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
            req.user_id = payload.Uid;
        } catch(error) {
            //console.log(error.message)
            if(error.message === 'jwt expired' && !(req.method === 'GET' && req.originalUrl.includes('/api/posts/')))
                return res.status(403).json({ error: '請重新登入' });
        }
        next();
    }; 
};

const updateDB = async () => {
    let posts = await Post.find();
    let allAges = [], allAnimals = {}, allLocations = [];
    let insertAges = [], insertLocations = [];

    for (let index = 0; index < posts.length; index++) {
        if(!allAges.includes(posts[index].age) && posts[index].age && posts[index].age !== undefined) {
            allAges.push(posts[index].age)
            insertAges.push({ age: posts[index].age })
        }
        if(!Object.keys(allAnimals).includes(posts[index].animal) && posts[index].animal && posts[index].animal !== undefined) {
            if(posts[index].breed && posts[index].breed !== undefined) {
                allAnimals[posts[index].animal] = [posts[index].breed];
            }
            else
                allAnimals[posts[index].animal] = [];
        } 
        else {
            if(!allAnimals[posts[index].animal].includes(posts[index].breed) && posts[index].breed && posts[index].breed !== undefined) {
                allAnimals[posts[index].animal].push(posts[index].breed)
            }
        }
        if(!allLocations.includes(posts[index].location) && posts[index].location && posts[index].location !== undefined) {
            allLocations.push(posts[index].location)
            insertLocations.push({ location: posts[index].location })
        }      
    }

    try {
        await Age.deleteMany({});
        await Age.insertMany(insertAges);
        await Animal.deleteMany({});
        for (const [key, value] of Object.entries(allAnimals)) {
            const newAnimal = new Animal({ 
                animal: key,
                breeds: value,
            });
            await newAnimal.save();
          }
        await Location.deleteMany({});
        await Location.insertMany(insertLocations);
     } catch (e) {
        console.log(e);
     }
};

export { authentication, updateDB };