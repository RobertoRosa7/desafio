import {Cards} from "../interfaces/cards";
import * as path from "path";

const sqlite = require('sqlite3').verbose();

const database = new sqlite.Database(path.resolve(__dirname, '../database/cards.sqlite'));

export const createTable = (): Promise<boolean> => {
    const query = `create table if not exists cards(
    id integer primary key autoincrement,
    status text not null,
    description text not null,
    title text not null,
    created_at text not null)`;

    return new Promise<boolean>((resolve, reject) => {
        database.run(query, (error: any, success: boolean) => {
            if (error) reject(error);
            resolve(success);
        });
    });
}

export const deleteTable = (name: string) => {
    const query = `drop table ${name}`;
    return new Promise((resolve, reject) => {
        database.run(query, (error: any, success: any) => {
            if (error) reject(error);
            resolve(success);
        });
    });
}

export const findAll = (): Promise<Cards[]> => {
    const query = `select * from cards`;
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            database.all(query, (error: Error, success: Cards[]) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}

export const insertOne = ({status, description, title, created_at}: Cards): Promise<Boolean> => {
    const query = `insert into cards(status, description, title, created_at) values (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            const stmt = database.prepare(query);
            stmt.run({1: status, 2: description, 3: title, 4: created_at}, (error: any, success: boolean) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}

export const updateOne = (id: number, {status, description, title, created_at}: Cards): Promise<Boolean> => {
    const query = `update cards set status = $status, description = $description, title= $title, created_at = $created_at where id = $id`;
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            const stmt = database.prepare(query);
            const params = {
                $status: status,
                $description: description,
                $title: title,
                $created_at: created_at,
                $id: id
            };
            stmt.run(params, (error: Error, success: boolean) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}

export const deleteOne = (id: number): Promise<Boolean> => {
    const query = `delete from cards where id = $id`;
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            const stmt = database.prepare(query);
            stmt.run({$id: id}, (error: Error, success: boolean) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}

export const findById = (id: number): Promise<Cards> => {
    const query = `select * from cards where id = $id`;
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            const stmt = database.prepare(query);
            stmt.get({$id: id}, (error: Error, success: Cards) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}
createTable().then();
