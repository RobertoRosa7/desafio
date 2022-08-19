import {findOne} from "../models/login";
import {NextFunction, Request, Response} from "express";

require('dotenv').config({path: `.env-${process.env.NODE_ENV}`});

const jwt = require('jsonwebtoken');

export const auth = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const auth: any = request.headers.authorization;

        if (!auth) {
            return response.status(401).json({message: "credential invalid"});
        }

        const token = auth.replace('Bearer ', '');
        const {login, password} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findOne(login, password);

        if (!user) {
            return response.status(401).json({message: "credential invalid"});
        }
        next();
    } catch (e) {
        return response.status(401).json({message: "credential invalid"});
    }
}
