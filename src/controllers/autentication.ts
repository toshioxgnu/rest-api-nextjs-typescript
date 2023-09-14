
import express from 'express';
import { random, authentication } from '../helpers';
import { createUser, getUserByemail } from '../db/users';


export const login = async( req: express.Request, res: express.Response ) => {

    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.sendStatus(400);
        }

        const user = await getUserByemail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.sendStatus(400);
        }

        const expectedhash = authentication( user.authentication.salt, password );

        if( user.authentication.password != expectedhash ) {
            return res.sendStatus(403);
        }

        const salt = random();

        user.authentication.sessionToken = authentication(salt, user._id.toString());

        res.cookie('USER_AUTH', user.authentication.sessionToken, { domain: 'localhost', path:'/' });

        return res.status(200).json(user).end();

    }catch(e){
        console.error(e);
        return res.sendStatus(400);
    }

}




export const register = async ( req: express.Request, res: express.Response ) => {
    try {
        const { email, password, username } = req.body;

        if(!email || !password || !username) return res.sendStatus(400);

        const existingUser = await getUserByemail(email);

        if (existingUser)return res.sendStatus(400);

        const salt = random();
        
        const user = await createUser({
            email,
            username,
            authentication : {
                salt,
                password: authentication(salt,password),
            },
        });

        return res.status(200).json(user);


    }catch( e) {
        console.error(e);
        return res.sendStatus(400);
    }
}