import {NextFunction, Request, Response} from "express";
import * as db from "../models/cards";
import {Cards} from "../interfaces/cards";
import {RequestMethods} from "../utils/request-methods";

const showLogs = (request: Request, card: Cards, id: number): string => {
    return `${new Date().toLocaleString()} - Card ${id} - ${card.title} - ${RequestMethods[request.method.toLowerCase()]}`
}

const findCard = async (id: number): Promise<Cards> => {
    return await db.findById(id);
}

const createLog = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id);
    console.log(showLogs(request, await findCard(id), id));
    next();
}

export const log = async (request: Request, response: Response, next: NextFunction) => createLog(request, response, next);
