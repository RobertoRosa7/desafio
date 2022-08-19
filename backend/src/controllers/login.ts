import {findOne} from "../models/login";
import {Request, Response} from "express";
import {User} from "../interfaces/cards";

require('dotenv').config({path: `.env-${process.env.NODE_ENV}`});

const jwt = require('jsonwebtoken');

export const login = async (request: Request, response: Response) => {
    const credential: any = request.headers.credential;

    if (!credential) {
        return response.status(401).json({message: "Not authorized"});
    }

    const buff = Buffer.from(credential, 'base64');
    const {login, password} = JSON.parse(buff.toString('ascii'));

    if (!login || !password) {
        return response.status(401).json({message: "Not authorized"});
    }

    const user: User = await findOne(login, password);

    if (!user) {
        return response.status(401).json({message: "Not authorized"});
    }

    const token = jwt.sign({login, password}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return response.status(200).json({message: "token created", data: {token}});
}
