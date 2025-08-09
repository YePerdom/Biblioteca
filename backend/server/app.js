import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import librosRoutes from "./routes/libros.routes.js";
import prestamosRoutes from "./routes/prestamos.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', usuariosRoutes)
app.use('/api/v1/libros', librosRoutes)
app.use('/api/v1/prestamos', prestamosRoutes)

export default app;