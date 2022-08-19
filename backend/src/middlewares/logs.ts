import {NextFunction, Request, Response} from "express";
import * as db from '../models/cards';
import {Cards} from "../interfaces/cards";

const createLog = async (request: Request, response: Response, next: NextFunction, name: string) => {
    const id: number = parseInt(request.params.id);
    const card: Cards = await db.findById(id);
    console.log(`${new Date().toLocaleString()} - Card ${id} - ${card.title} - ${name}`);
    next();
}

export const deleteLog = async (request: Request, response: Response, next: NextFunction) =>
    createLog(request, response, next, "Removido");

export const updateLog = async (request: Request, response: Response, next: NextFunction) =>
    createLog(request, response, next, "Alterado");
