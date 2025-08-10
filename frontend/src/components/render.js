import { formatearFecha } from "../utils/formater.js";

export function renderPrestamos(prestamos){
    const tbody = document.querySelector("#prestamos-table tbody");
    tbody.innerHTML = "";

    prestamos.forEach(prestamo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${prestamo.id_prestamo}</td>
            <td>${prestamo.nombre_usuario}</td>
            <td>${prestamo.identificacion_usuario}</td>
            <td>${prestamo.titulo}</td>
            <td>${formatearFecha(prestamo.fecha_prestamo)}</td>
            <td>${formatearFecha(prestamo.fecha_devolucion)}</td>
            <td>${prestamo.estado}</td>
            <td>aqui van las aciones</td>
        `;
        tbody.appendChild(fila);
    });
}
