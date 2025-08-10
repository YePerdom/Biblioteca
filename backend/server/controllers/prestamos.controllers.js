import { pool } from "../config/db.js"


// ************** CRUD ************** //
// GET obtener todos los prestamos
export const obtenerPrestamos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.id_prestamo, u.nombre_usuario, u.identificacion_usuario, l.titulo, p.fecha_prestamo, p.fecha_devolucion, p.estado FROM prestamos p LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario LEFT JOIN libros l ON p.isbn = l.isbn;');
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
        const [rows] = await pool.query('SELECT p.id_prestamo, u.nombre_usuario, u.identificacion_usuario, l.titulo, p.fecha_prestamo, p.fecha_devolucion, p.estado FROM prestamos p JOIN usuarios u ON p.id_usuario = u.id_usuario JOIN libros l ON p.isbn = l.isbn WHERE id_prestamo = ?;', [id_prestamo]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'préstamo no encontrado' });
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

// POST crear un nuevo préstamo
export const crearPrestamo = async (req, res) => {
    const { nombre_usuario, titulo, fecha_prestamo, fecha_devolucion, estado } = req.body;
    try {
        if (!nombre_usuario || !titulo || !fecha_prestamo || !fecha_devolucion || !estado) {
            return res.status(400).json({
                status: "error",
                mensaje: "Todos los campos son obligatorios",
                endpoint: req.originalUrl,
                method: req.method
            });
        };
        //validacion si el usuario exite
        const [usuario] = await pool.query('SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?;', [nombre_usuario]);
        if (usuario.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "usuario no encontrado",
                endpoint: req.originalUrl,
                method: req.method,
            });
        };
        //validacion si el libro no existe
        const [libro] = await pool.query('SELECT isbn FROM libros WHERE titulo = ?;', [titulo]);
        if (libro.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "libro no encontrado",
                endpoint: req.originalUrl,
                method: req.method,
            });
        };
        //desestructuracio de objeto para utilizar valores en el insert
        const [{ id_usuario }] = usuario;
        const [{ isbn }] = libro;
        //envio de datos 
        const [result] = await pool.query('INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?,?,?,?,?);', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado]);
        res.status(201).json({ mensaje: 'préstamo creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
};

// PUT actualizar un préstamo
export const actualizarPrestamo = async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;
    try {
        const [result] = await pool.query('UPDATE prestamos SET id_usuario = ?, isbn = ?, fecha_prestamo = ?, fecha_devolucion= ?, estado = ? WHERE id_prestamo = ?;', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado, id_prestamo]);
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'préstamo no encontrado' });
        }
        res.status(202).json({ mensaje: 'préstamo actualizado' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
};

// DELETE eliminar un préstamo
export const eliminarPrestamo = async (req, res) => {
    const { id_prestamo } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM prestamos WHERE id_prestamo = ?;', [id_prestamo]);
        if (result.affectedRows === 0) {
            res.status(404).json({
                status: "error",
                mensaje: 'préstamo no encontrado',
                endpoint: req.originalUrl,
                method: req.method,
            });
        }
        res.status(200).json({ mensaje: 'préstamo eliminado' });
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
        const [rows] = await pool.query('SELECT u.id_usuario, u.nombre_usuario, u.identificacion_usuario, COUNT(p.id_usuario) PRÉSTAMOS FROM prestamos p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.id_usuario = ? GROUP BY u.id_usuario, u.nombre_usuario, u.identificacion_usuario;', [id_usuario]);
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
        const [rows] = await pool.query('SELECT p.id_prestamo, u.nombre_usuario, u.identificacion_usuario, l.titulo, p.fecha_prestamo, p.fecha_devolucion, p.estado FROM prestamos p JOIN usuarios u ON p.id_usuario = u.id_usuario JOIN libros l ON p.isbn = l.isbn WHERE estado = "activo";');
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
        const [rows] = await pool.query('SELECT l.isbn, l.titulo, COUNT(p.isbn) prestamos FROM prestamos p LEFT JOIN libros l ON p.isbn = l.isbn WHERE l.isbn = ? GROUP BY l.isbn, l.titulo;', [isbn]);
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