import express from "express";
import { viewA } from "../controllersrotas/controllAluno.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const rota = express.Router();

// Define a rota POST /viewA que usa o middleware de autenticação
// e chama o controller viewA
rota.post('/viewA', authMiddleware, viewA);

export default rota;
