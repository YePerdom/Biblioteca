import fs, { copyFileSync } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../config/db.js';

export async function loadPrestamos() {
    const rutaArchivo = path.resolve('server/data/3_prestamos.csv');
    const prestamos = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo).pipe(csv({ separator: ';' })).on('data', (fila) => {
            prestamos.push([
                parseInt(fila.id_usuario),
                fila.isbn,
                fila.fecha_prestamo,
                fila.fecha_devolucion,
                fila.estado
            ]);
        }).on('end', async () => {
            try {
                const sql = 'INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES ?';
                const [results] = await pool.query(sql, [prestamos]);
                console.log(`se han insertado ${results.affectedRows} prestamos`);
                resolve()
            } catch (error) {
                console.error('no se han podido insertar libros', error.message);
                reject(error)
            }
        }).on('error', (error) => {
            console.log('error al leer archivo', error.message);
            reject(error)
        });
    });
}