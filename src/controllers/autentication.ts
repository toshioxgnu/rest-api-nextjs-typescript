
import express from 'express';
import { random, autentication } from '../helpers';
import { createUser,getUserByemail } from '../db/users';



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
                password: autentication(salt,password),
            },
        });

        return res.status(200).json(user);


    }catch( e) {
        console.error(e);
        return res.sendStatus(400);
    }
}