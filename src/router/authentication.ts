import express from 'express';
import  {register}  from '../controllers/autentication';

export default ( router: express.Router ) => {
    router.post('/auth/register', register);
}