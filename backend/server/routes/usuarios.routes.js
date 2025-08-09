import { Router } from "express";
import { usuariosRetrasaados } from "../controllers/usuarios.controllers.js";

const usuariosRouter = Router();

usuariosRouter.get('/con-retrasos', usuariosRetrasaados);

export default usuariosRouter;