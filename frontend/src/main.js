import { cargarPrestamoID, cargarPrestamos, crearPrestamo } from "./api/prestamos.js"
import { renderPrestamos } from "./components/render.js";

async function mostrarPrestamos() {
    try {
        const prestamos = await cargarPrestamos();
        renderPrestamos(prestamos);
    } catch (error) {
        console.error(error.message);
    };
};

document.addEventListener("DOMContentLoaded", mostrarPrestamos)

async function mostrarPrestamoId(id) {
    try {
        const prestamos = await cargarPrestamoID(id);
        if (prestamos.length === 0) {
            alert("no existe préstamo para mostrar");
        };
        renderPrestamos(prestamos);
    } catch (error) {
        console.error(error.message);
    };
};

const buscador = document.getElementById("buscador-form");

buscador.addEventListener("submit", (e) => {
    e.preventDefault();
    const buscado = buscador.buscado.value;
    mostrarPrestamoId(buscado);
});

const form = document.getElementById("prestamos-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const prestamoData = Object.fromEntries(formData.entries());
    try {
        await crearPrestamo(prestamoData);
        alert("prestamo creado")
        form.reset();
        cargarPrestamos();
    } catch (error) {
        alert(error)
        console.error(error.message);
    };
});