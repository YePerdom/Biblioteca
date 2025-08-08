import express from 'express';
import cors from 'cors';
import prestamosRoutes from './routes/prestamos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', prestamosRoutes)

export default app;