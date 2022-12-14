require('dotenv').config({path: `.env-${process.env.NODE_ENV}`});
import {Request, Response} from "express";

const express = require('express');
const app = express();
const cors = require('cors');

const headers = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'WithCredentials',
    'Set-Cookie',
    'Token',
    'Credential',
    'Authorization'];
app.use(cors(
    {
        allowedHeaders: headers,
        exposedHeaders: headers,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        credentials: true,
    }
));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/home', require('./src/routes/home.ts'));
app.use('/login', require('./src/routes/login.ts'));

app.get('/', async (request: Request, response: Response) => {
    return response.status(200).json({status: true, message: "The Server is Running!"});
});

app.listen(5000, () => {
    console.log(`The server is running on: ${5000}`);
    console.log('TimeZone: ', new Date().toString());
});

