export function formatearFecha(fechaIso) {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString("es-Co", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};