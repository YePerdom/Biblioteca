import { pool } from "../config/db.js";

//GET Listar usuarios que tienen préstamos en estado "retrasado"
export const usuariosRetrasaados = async (req, res) => {
    try {
        const [rows] = await pool.query( 'SELECT u.id_usuario, u.nombre_usuario, u.identificacion_usuario, l.titulo, p.estado FROM usuarios u JOIN prestamos p ON u.id_usuario = p.id_usuario JOIN libros l ON p.isbn = l.isbn WHERE p.estado = "retrasado";');
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