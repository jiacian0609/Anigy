import { Router } from 'express'
import User from '../models/User.js'
import { authentication, updateDB } from '../utils/util.js';

const router = Router();

//get user info
router.get('/', authentication(), async function(req, res, next)  {
    try{
        console.log('get user info');
        const user_id = req.user_id;
        console.log('user id', user_id);
        const user = await User.find({ _id: user_id })
        console.log(user[0])
        if( user[0] === undefined ) {
            return res.status(404).send('User does not exist.');
        }
        res.send({'message': 'find user info successfully.', 'info': user[0]})    
    } catch (err) {
        console.error(err.message)
    }
});

router.patch('/', authentication(), async function(req, res, next)  {
    console.log('update user info');
    console.log('req headers', req.headers);
    const user_id = req.user_id;
    console.log('user_id', user_id)
    const { username, email, mobile} = req.body;
    console.log( user_id, username, email, mobile );
    try {
        
        const updateUser = await User.updateOne({ _id: user_id }, {$set: { username, email, mobile }})
        if(updateUser.modifiedCount === 0) {
            return res.status(403).json({error: 'Update Forbidden'})
        }
        else {
            updateDB();
            return res.status(200).json({ message: 'Update Success'})
        }
    } catch (err) {
        return res.status(400).json({error: 'Update a user error'})
    }
});

export default router;