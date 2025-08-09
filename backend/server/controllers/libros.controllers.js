import { pool } from "../config/db.js";

//GET Listar los 5 libros más prestados
export const librosMasPrestados = async (req, res) => {
    try {
        const [rows] = await pool.query( 'SELECT l.isbn AS "ISBN", l.titulo AS "TITULO", COUNT(p.isbn) AS "PRESTAMOS" FROM libros AS l LEFT JOIN prestamos AS p ON l.isbn = p.isbn GROUP BY l.isbn, l.titulo ORDER BY COUNT(p.isbn) DESC LIMIT 5;');
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