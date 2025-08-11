import { cargarPrestamoID, cargarPrestamos, crearPrestamo, editarPrestamo, eliminarPrestamo } from "../services/prestamos.service.js";
import { renderPrestamos, renderTableEditable } from "../components/render.component.js";
import { manejoError } from "../utils/utils.js";

export async function mostrarPrestamos() {
    try {
        const prestamos = await cargarPrestamos();
        renderPrestamos(prestamos);
    } catch (error) {
        manejoError(error)
    };
};

export async function mostrarPrestamoId(buscador) {
    const buscado = parseInt(buscador.buscado.value)
    try {
        if (!buscado) {
            return await mostrarPrestamos();
        };
        const prestamo = await cargarPrestamoID(buscado);
        renderPrestamos(prestamo);
    } catch (error) {
        manejoError(error);
    };
};

export async function prestamo(form) {
    const formData = new FormData(form);
    const prestamoData = Object.fromEntries(formData.entries());
    try {
        await crearPrestamo(prestamoData);
        form.reset();
    } catch (error) {
        manejoError(error)
    }
}

export async function prestamoEditor(id) {
    try {
        const prestamoData = await cargarPrestamoID(id)
        if (!prestamoData) return
        renderTableEditable(prestamoData);
    } catch (error) {
        manejoError(error)
    }
}

export async function prestamoEditado(id, fila) {
    try {
        const nombre_usuario = fila.querySelector("td:nth-child(2)").textContent.trim();
        const identificacion_usuario = fila.querySelector("td:nth-child(3)").textContent.trim();
        const titulo = fila.querySelector("td:nth-child(4)").textContent.trim();
        const fecha_prestamo = fila.querySelector("td:nth-child(5)").textContent.trim();
        const fecha_devolucion = fila.querySelector("td:nth-child(6) input").value;
        const estado = fila.querySelector("td:nth-child(7) select").value;
        const prestamoData = { nombre_usuario, identificacion_usuario, titulo, fecha_prestamo, fecha_devolucion, estado };
        await editarPrestamo(id, prestamoData);
        await mostrarPrestamos();
    } catch (error) {
        manejoError(error);
    };
};

export async function borrarPrestamo(id) {
    try {
        const conf = await cargarPrestamoID(id);
        if (!conf) return
        await eliminarPrestamo(id);
        alert(`prestamo ${id} eliminado exitosamente`);
        await mostrarPrestamos();
    } catch (error) {
        manejoError(error);
    };
};