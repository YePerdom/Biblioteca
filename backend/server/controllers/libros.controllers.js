import { pool } from "../config/db.js";

//GET Listar los 5 libros más prestados
export const librosMasPrestados = async (req, res) => {
    try {
        const [rows] = await pool.query( 'SELECT l.isbn, l.titulo, COUNT(p.isbn) prestamos FROM libros l LEFT JOIN prestamos p ON l.isbn = p.isbn GROUP BY l.isbn, l.titulo ORDER BY COUNT(p.isbn) DESC LIMIT 5;');
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