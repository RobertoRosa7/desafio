require('dotenv').config({path: `.env-${process.env.NODE_ENV}`});
import * as path from "path";
import {User} from "../interfaces/cards";

const bcrypt = require('bcrypt');
const sqlite = require('sqlite3').verbose();
const database = new sqlite.Database(path.resolve(__dirname, '../database/cards.sqlite'));

const createTableUser = (): Promise<boolean> => {
    const query = `create table if not exists users(
        id integer primary key autoincrement,
        login text not null,
        password text not null)`

    return new Promise<boolean>((resolve, reject) => {
        database.run(query, (error: Error, success: boolean) => {
            if (error) reject(error);
            resolve(success);
        });
    });
}

export const findOne = (login: string, password: string): Promise<User> => {
    const query = `select * from users where login = $login`;
    return new Promise<User>((resolve, reject) => {
        database.serialize(async () => {
            const stmt = database.prepare(query);
            stmt.get({$login: login}, async (error: Error, user: User) => {
                if (error) reject(error);
                if (!user) {
                    reject(new Error("Usuário não cadastrado"));
                } else {
                    const comparePass = await bcrypt.compare(password, user.password);
                    if (!comparePass) reject(new Error("Credential invalid!"));
                    resolve(user);
                }
            });
        });
    });
}

const insertUserTest = (login: string, password: string): Promise<boolean> => {
    const query = `insert into users(login, password) values($login, $password)`;
    return new Promise<boolean>(async (resolve, reject) => {
        const user: User = await findOne(login, password);
        if (!user) {
            const encryptPass = await bcrypt.hash(password, 5);
            console.log(encryptPass);
            database.serialize(() => {
                const stmt = database.prepare(query);
                stmt.run({$login: login, $password: encryptPass}, (error: Error, success: boolean) => {
                    if (error) reject(error);
                    resolve(success);
                });
            });
        }
        resolve(false);
    });
}

const deleteUser = (id: number): Promise<boolean> => {
    const query = `delete from users where id = $id`;
    return new Promise<boolean>((resolve, reject) => {
        database.serialize(() => {
            const stmt = database.prepare(query);
            stmt.run({$id: id}, (error: Error, success: boolean) => {
                if (error) reject(error);
                resolve(success);
            });
        });
    });
}

createTableUser().then();
insertUserTest(process.env.USER_NAME ?? '', process.env.PASSWORD ?? '').then();
