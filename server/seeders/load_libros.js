import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../config/db.js';

export async function loadLibros() {
    const rutaArchivo = path.resolve('server/data/2_libros.csv');
    const libros = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo).pipe(csv({ separator: ';' })).on('data', (fila) => {
            libros.push([
                fila.isbn,
                fila.titulo,
                parseInt(fila.año_publicacion),
                fila.autor
            ]);
        }).on('end', async () => {
            try {
                const sql = 'INSERT INTO libros (isbn, titulo, año_publicacion, autor) VALUES ?;';
                const [results] = await pool.query(sql, [libros]);
                console.log(`se insertaron ${results.affectedRows} libros`);
                resolve();
            } catch (error) {
                console.error('error al insertar libros: ', error.message);
                reject(error);
            }
        }).on('error', (error) => {
            console.error('error al intentar leer archivo: ', error.message);
            reject(error);
        });
    });
}