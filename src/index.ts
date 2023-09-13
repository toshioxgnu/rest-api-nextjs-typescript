import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import router from './router';


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server  = http.createServer(app);

server.listen(8080, () =>{
    console.log('server running on http://localhost:8080');
} );

const mongoUrl = process.env.MONGO_URL || '';

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);
mongoose.connection.on('error', ( error: Error ) => console.error(error));

app.use('/', router());
