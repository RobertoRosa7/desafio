import {Cards} from "../interfaces/cards";
import * as db from "../models/cards";
import {Request, Response} from "express";

export const createTask = async (request: Request, response: Response) => {
    const payload: Cards = request.body;
    try {
        await db.insertOne(payload);
        return response.status(200).json({message: "Cards create with success!"});
    } catch (error) {
        console.log(error)
        return response.status(400).json({message: "Not was possible create task!"});
    }
}

export const findAll = async (request: Request, response: Response) => {
    try {
        const tasks = await db.findAll();
        return response.status(200).json({message: "success", data: tasks});
    } catch (e) {
        return response.status(400).json({message: "Not was possible fetch task!"});
    }
}

export const updateOne = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const payload: Cards = request.body;

    if (!id) {
        return response.status(404).json({message: "id is required"});
    }

    try {
        await db.updateOne(id, payload);
        console.log(`card update: ${new Date().toDateString()}`);

        return response.status(201).json({message: "update with success!"});
    } catch (error) {
        return response.status(400).json({message: "Not was possible update task!"});
    }
}

export const deleteOne = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);

    if (!id) {
        return response.status(404).json({message: "id is required"});
    }

    try {
        await db.deleteOne(id);
        const tasks = await db.findAll();

        return response.status(201).json({message: "delete with success", data: tasks});
    } catch (error) {
        return response.status(400).json({message: "Not was possible delete task!"});
    }
}
