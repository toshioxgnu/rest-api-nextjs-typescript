import { getUserBySessionToken } from 'db/users';
import express from 'express';
import { get, merge  } from 'lodash';


export const isAuthenticated = async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    try {
        const sessionToken = req.cookies['USER_AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        

    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

