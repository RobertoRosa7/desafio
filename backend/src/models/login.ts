import {User} from "../interfaces/cards";

require('dotenv').config({path: `.env-${process.env.NODE_ENV}`});

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER_DATABASE,
    password: process.env.PASS_DATABASE,
    database: process.env.DATABASE,
    connectionLimit: 5
});

const bcrypt = require('bcrypt');

const createTableUser = async () => {
    let conn: any;
    try {
        conn = await pool.getConnection();
        const query = `create table if not exists users(
            id int primary key auto_increment,
            login varchar(200) not null,
            password varchar(200) not null)`
        await conn.query(query);
    } catch (e) {
        throw new Error("");
    } finally {
        if (conn) conn.end();
    }
}

export const findOne = (login: string, password: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const query = `select * from users where login = ?`;
            const user = await conn.query(query, Object.values({login}));
            if (!user[1]) {
                resolve(null);
            } else {
                const comparePass = await bcrypt.compare(password, user[1].password);
                if (!comparePass) reject(new Error("Credential invalid!"));
                resolve(user[1]);
            }
        } catch (e) {
            reject(e)
        } finally {
            if (conn) conn.end();
        }
    });
}

const insertUserTest = (): Promise<boolean> => {
    const login: any = process.env.USER_NAME;
    const password: any = process.env.PASSWORD;

    return new Promise<boolean>(async (resolve, reject) => {
        let conn: any;
        try {
            conn = await pool.getConnection();
            const user: User = await findOne(login, password);
            if (!user) {
                const encryptPass = await bcrypt.hash(password, 5);
                const query = `insert into users(login, password) values(?, ?)`;
                const res = await conn.query(query, Object.values({login, password: encryptPass}));
                resolve(res);
            }
        } catch (e) {
            reject(e);
        } finally {
            if (conn) conn.end();
        }
    });
}

createTableUser().then();
insertUserTest().then();
