import { pool } from "../config/db.js";
import { loadLibros } from "./load_libros.js";
import { loadPrestamos } from "./load_prestmos.js";
import { loadUsuarios } from "./load_usuarios.js";

(async () => {
    try {
        console.log('cargando seeders...');
        await loadUsuarios();
        await loadLibros();
        await loadPrestamos();
        console.log('seeders cargados exitosamente');
        return
    } catch (error) {
        console.error('imposible caragar seeder, ha ocurrido un error: ', error.message);
    } finally {
        await pool.end();
        console.log('conexion cerrada correctamente');
    }
})();