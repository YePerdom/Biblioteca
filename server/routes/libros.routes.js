import { Router } from "express";
import { librosMasPrestados } from "../controllers/libros.controllers.js";

const librosRouter = Router();

librosRouter.get('/mas-prestados', librosMasPrestados);

export default librosRouter;