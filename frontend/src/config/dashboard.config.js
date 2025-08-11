import { borrarPrestamo, mostrarPrestamoId, mostrarPrestamos, prestamo, prestamoEditado, prestamoEditor } from "../controllers/dashboard.controllers.js";
import { manejoError } from "../utils/utils.js";

let eventoCorriendo = false;

export async function dashboardConfig() {
    try {
        await mostrarPrestamos();

        const form = document.getElementById("prestamos-form");
        const buscador = document.getElementById("buscador-form");
        const table = document.getElementById("prestamos-table");

        if (!form || !buscador) {
            console.error("Formulario o buscador no encontrados en el DOM");
            return;
        };

        if (!eventoCorriendo) {
            try {
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    try {
                        await prestamo(form);
                        await mostrarPrestamos();
                    } catch (error) {
                        manejoError(error);
                    };
                });

                buscador.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    try {
                        await mostrarPrestamoId(buscador);
                    } catch (error) {
                        manejoError(error);
                    };
                });

                table.addEventListener("click", async (e) => {
                    try {
                        const id = e.target.getAttribute("data-id");
                        if (e.target.classList.contains("editar")) {
                            try {
                                await prestamoEditor(id);
                            } catch (error) {
                                manejoError(error);
                            };
                        };
                        if (e.target.classList.contains("eliminar")) {
                            try {
                                const conf = confirm(`deseas eliminar el prestamo ${id}`);
                                if (!conf) return;
                                await borrarPrestamo(id);
                            } catch (error) {
                                manejoError(error);
                            };
                        };
                        if (e.target.classList.contains("guardar")) {
                            try {
                                const fila = e.target.closest("tr");
                                await prestamoEditado(id, fila);
                            } catch (error) {
                                manejoError(error);
                            };
                        };
                        if (e.target.classList.contains("cancelar")) {
                            try {
                                await mostrarPrestamos();
                            } catch (error) {
                                manejoError(error);
                            };
                        };
                    } catch (error) {
                        manejoError(error);
                    };
                });
            } catch (error) {
                manejoError(error);
            };
        };
        eventoCorriendo = true;
    } catch (error) {
        manejoError(error);
    };
};