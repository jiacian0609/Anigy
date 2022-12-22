import dotenv from "dotenv-defaults";
dotenv.config();
import jwt from 'jsonwebtoken'

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

        accessToken = accessToken.replace('Bearer ', '');
        if (accessToken == 'null') {
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

export { authentication };