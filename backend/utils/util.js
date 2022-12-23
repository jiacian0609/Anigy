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
        } catch(e) {
            //console.log(e)
        }
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