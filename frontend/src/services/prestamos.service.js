import axios from "axios";
import { manejoError } from "../utils/utils";
const API_URL = 'http://localhost:3000/api/v1'

export async function cargarPrestamos() {
    try {
        const res = await axios.get(`${API_URL}/prestamos`);
        return res.data;
    } catch (error) {
        manejoError(error)
    };
};

export async function cargarPrestamoID(id) {
    try {
        const res = await axios.get(`${API_URL}/prestamos/${id}`);
        return res.data
    } catch (error) {
        alert(`prestamo ${id} no existe`);
        manejoError(error)
    };
};

export async function crearPrestamo(prestamoData) {
    try {
        const res = await axios.post(`${API_URL}/prestamos`, prestamoData);
        return res.data;
    } catch (error) {
        manejoError(error)
    };
};

export async function editarPrestamo(id, prestamoData) {
    try {
        const res = await axios.put(`${API_URL}/prestamos/${id}`, prestamoData);
        return res.data
    } catch (error) {
        manejoError(error);
    };
};

export async function eliminarPrestamo(id){
    try {
        const res = await axios.delete(`${API_URL}/prestamos/${id}`)
        return res.data
    } catch (error) {
        manejoError(error)
    }
};