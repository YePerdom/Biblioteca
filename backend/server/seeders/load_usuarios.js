import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { pool } from "../config/db.js";

export async function loadUsuarios() {
    const rutaArchivo = path.resolve('server/data/1_usuarios.csv');
    const usuarios = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo).pipe(csv({ separator: ';' })).on('data', (fila) => {
            usuarios.push([
                fila.id_usuario,
                fila.nombre_usuario,
                fila.identificacion_usuario,
                fila.correo,
                fila.telefono
            ]);
        }).on('end', async () => {
            try {
                const sql = 'INSERT INTO usuarios (id_usuario, nombre_usuario, identificacion_usuario, correo, telefono) VALUES ?;';
                const [results] = await pool.query(sql, [usuarios]);
                console.log(`se insertaron ${results.affectedRows} usuarios`);
                resolve();
            } catch (error) {
                console.error('error al insertar usuarios: ', error.message);
                reject(error);
            }
        }).on('error', (error) => {
            console.error('error al leer archivo: ', error.message);
            reject(error);
        });
    });
}