import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DataBase_Prof_Tereza_Costa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function getConnection() {
    return pool.getConnection();
};


async function readAll(table, where = null) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`
        }

        const [rows] = await connection.execute(sql);
        return rows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err
    } finally {
        connection.release();
    }
}



async function read(table, where) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`;
        }

        const [rows] = await connection.execute(sql);
        return rows[0] || null;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err
    } finally {
        connection.release();
    }
}

async function create(table, data) {
    const connection = await getConnection();
    try {
        const columns = Object.keys(data).join(', ');
        const placeholders = Array(Object.keys(data).length).fill('?').join(', ');

        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        const values = Object.values(data);

        const [result] = await connection.execute(sql, values);

        return result.insertId;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err
    } finally {
        connection.release();
    }
}

async function update(table, data, where) {
    const connection = await getConnection();
    try {
        const set = Object.keys(data)
            .map(column => `${column} = ?`)
            .join(', ');
        
        const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
        const values = Object.values(data);
        
        const [result] = await connection.execute(sql, [...values]);
        return result.affectedRows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err
    } finally {
        connection.release();
    }
}

async function deleteRecord(table, where) {
    const connection = await getConnection();
    try {
        const sql = `DELETE FROM ${table} WHERE ${where}`;
        const [result] = await connection.execute(sql);
        return result.affectedRows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err
    } finally {
        connection.release();
    }
}

async function compare(senha, hash) {
    try {
        return await bcrypt.compare(senha, hash)
    } catch (err) {
        console.error('Erro ao comprarar a senha com o hash: ', err);
        return false;
    }
}

export {readAll, read, create, update, deleteRecord, compare};