import { pool } from "../config/db.js";

//GET Listar usuarios que tienen préstamos en estado "retrasado"
export const usuariosRetrasaados = async (req, res) => {
    try {
        const [rows] = await pool.query( 'SELECT u.id_usuario AS "ID", u.nombre_usuario AS "USUARIO", u.identificacion_usuario AS "IDENTIFICACION", l.titulo AS "TITULO", p.estado AS "ESTADO" FROM usuarios AS u INNER JOIN prestamos AS p ON u.id_usuario = p.id_usuario INNER JOIN libros AS l ON p.isbn = l.isbn WHERE p.estado = "retrasado";');
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};