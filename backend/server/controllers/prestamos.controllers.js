import { pool } from "../config/db.js"


// ************** CRUD ************** //
// GET obtener todos los prestamos
export const obtenerPrestamos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prestamos;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// GET obtener los prestamos por un id especifico
export const obtenerPrestamosPorId = async (req, res) => {
    const { id_prestamo } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM prestamos WHERE id_prestamo = ?;', [id_prestamo]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'presatamo no encontrado' });
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// POST crear un nuevo prestamo
export const crearPrestamo = async (req, res) => {
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?,?,?,?,?);', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado]);
        res.status(201).json({ mensaje: 'prestamo creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// PUT actualizar un prestamo
export const actualizarPrestamo = async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;
    try {
        const [result] = await pool.query('UPDATE prestamos SET id_usuario = ?, isbn = ?, fecha_prestamo = ?, fecha_devolucion= ?, estado = ? WHERE id_prestamo = ?;', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado, id_prestamo]);
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'prestamo no encontrado' });
        }
        res.status(202).json({ mensaje: 'prestamo actualizado' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// DELETE eliminar un prestamo
export const eliminarPrestamo = async (req, res) => {
    const { id_prestamo } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM prestamos WHERE id_prestamo = ?;', [id_prestamo]);
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'prestamo no encontrado' });
        }
        res.status(200).json({ mensaje: 'prestamo eliminado' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// ************** ESPECIALES **************//

// GET ver todos los prestamos de un usuario.
export const prestamosUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const [rows] = await pool.query( 'SELECT u.id_usuario ID, u.nombre_usuario USUARIO, u.identificacion_usuario IDENTIFICACION, COUNT(p.id_usuario) PRESTAMOS FROM prestamos p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.id_usuario = ? GROUP BY u.id_usuario, u.nombre_usuario, u.identificacion_usuario;', [id_usuario]);
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

//GET Listar préstamos que aún están activos
export const prestamosActivos = async (req, res) => {
    try {
        const [rows] = await pool.query( 'SELECT p.id_prestamo AS "ID", u.nombre_usuario AS "USUARIO", u.identificacion_usuario AS "IDENTIFICACION", l.titulo AS "TITULO", p.estado AS "ESTADO" FROM prestamos AS p INNER JOIN usuarios AS u ON p.id_usuario = u.id_usuario INNER JOIN libros AS l ON p.isbn = l.isbn WHERE estado = "activo";');
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

//GET Ver historial de un libro por su ISBN
export const historialPrestamoLibro = async (req, res) => {
    const { isbn } = req.params;
    try {
        const [rows] = await pool.query( 'SELECT l.isbn AS "ISBN", l.titulo AS "TITULO", COUNT(p.isbn) AS "PRESTAMOS" FROM prestamos AS p LEFT JOIN libros AS l ON p.isbn = l.isbn WHERE l.isbn = ? GROUP BY l.isbn, l.titulo;', [isbn]);
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