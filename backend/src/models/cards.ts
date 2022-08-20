import {Cards} from "../interfaces/cards";

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER_DATABASE,
    password: process.env.PASS_DATABASE,
    database: process.env.DATABASE,
    connectionLimit: 5
});


export const createTable = async (): Promise<any> => {
    let conn: any;
    try {
        conn = await pool.getConnection();
        const query = `create table if not exists cards(
                id int primary key auto_increment,
                status varchar(200) not null,
                description varchar(200) not null,
                title varchar(200) not null,
                created_at varchar(200) not null)`;
        await conn.query(query);
    } catch (e) {
        throw new Error("");
    } finally {
        if (conn) conn.end();
    }
}

export const findAll = (): Promise<Cards[]> => {
    return new Promise(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `select * from cards`;
            const res = await conn.query(query);
            resolve(res);
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}

export const insertOne = (payload: Cards) => {
    return new Promise(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `insert into cards(status, description, title, created_at) values (?, ?, ?, ?)`;
            const res = await conn.query(query, Object.values({
                1: payload.status,
                2: payload.description,
                3: payload.title,
                4: payload.created_at
            }));
            resolve(res);
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}

export const updateOne = (id: number, {status, description, title, created_at}: Cards): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `update cards set status = ?, description = ?, title= ?, created_at = ? where id = ?`;
            const res = await conn.query(query, Object.values({
                status,
                description,
                title,
                created_at,
                id
            }));
            resolve(res[0]);
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}

export const deleteOne = (id: number): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `delete from cards where id = ?`;
            const res = await conn.query(query, Object.values({id}));
            resolve(res[0]);
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}

export const findById = (id: number): Promise<Cards> => {
    return new Promise(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `select * from cards where id = ?`;
            const res = await conn.query(query, Object.values({id}));
            resolve(res[0]);
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}
createTable().then();
