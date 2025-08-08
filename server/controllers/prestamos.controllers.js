import { pool } from "../config/db.js"


//obtener todos los prestamos
export const obtenerPrestamos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prestamos;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'error al obtener prestamos', error: error.message });
    }
};

//obtener los prestamos por un id especifico
export const obtenerPrestamosPorId = async (req, res) => {
    const { id_prestamo } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM prestamos WHERE id_prestamo = ?;', [id_prestamo]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'presatamo no encontrado' });
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'error al obtener prestamos', error: error.message });
    }
};

//crear un nuevo prestamo
export const crearPrestamo = async (req, res) => {
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?,?,?,?,?);', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado]);
        res.status(201).json({ mensaje: 'prestamo creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'error al crear prestamos', error: error.message });
    }
};

//actualizar un prestamo
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
        res.status(500).json({ mensaje: 'error al actualizar prestamos', error: error.message });
    }
};

//eliminar un prestamo
export const eliminarPrestamo = async (req, res) => {
    const { id_prestamo } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM prestamos WHERE id_prestamo = ?', [id_prestamo]);
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'prestamo no encontrado' });
        }
        res.status(200).json({ mensaje: 'prestamo eliminado'});
    } catch (error) {
        res.status(500).json({ mensaje: 'error al eliminar prestamos', error: error.message });
    }
};