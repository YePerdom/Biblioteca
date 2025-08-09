import { Router } from "express";
import { actualizarPrestamo, crearPrestamo, eliminarPrestamo, historialPrestamoLibro, obtenerPrestamos, obtenerPrestamosPorId, prestamosActivos, prestamosUsuario } from "../controllers/prestamos.controllers.js";

const prestamosRouter = Router();

prestamosRouter.get('/', obtenerPrestamos);
prestamosRouter.get('/activos', prestamosActivos);
prestamosRouter.get('/:id_prestamo', obtenerPrestamosPorId);
prestamosRouter.get('/historial/:isbn', historialPrestamoLibro);
prestamosRouter.get('/usuario/:id_usuario', prestamosUsuario);
prestamosRouter.post('/', crearPrestamo);
prestamosRouter.put('/:id_prestamo', actualizarPrestamo);
prestamosRouter.delete('/:id_prestamo', eliminarPrestamo);

export default prestamosRouter;