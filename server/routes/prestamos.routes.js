import { Router } from "express";
import { actualizarPrestamo, crearPrestamo, eliminarPrestamo, obtenerPrestamos, obtenerPrestamosPorId } from "../controllers/prestamos.controllers.js";

const router = Router();

router.get('/prestamos', obtenerPrestamos);
router.get('/prestamos/:id_prestamo', obtenerPrestamosPorId);
router.post('/prestamos', crearPrestamo);
router.put('/prestamos/:id_prestamo', actualizarPrestamo);
router.delete('/prestamos/:id_prestamo', eliminarPrestamo);

export default router;