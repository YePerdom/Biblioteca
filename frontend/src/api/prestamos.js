import axios from "axios";
const API_URL = 'http://localhost:3000/api/v1'

export async function cargarPrestamos() {
    try {
        const res = await axios.get(`${API_URL}/prestamos`);
        return res.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    };
};

export async function cargarPrestamoID(id) {
    try {
        const res = await axios.get(`${API_URL}/prestamos/${id}`);
        return res.data
    } catch (error) {
        alert(`préstamo ${id} no existe`);
        console.error(error.message);
        throw error;
    };
};

export async function crearPrestamo(prestamoData) {
    try {
        const res = await axios.post(`${API_URL}/prestamos`, prestamoData);
        return res.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    };
};