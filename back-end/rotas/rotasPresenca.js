import express from "express";
import { viewP,marcaFalta,marcaAula,viewInformacaoP,marcaHistorico} from "../controllersrotas/controllPresenca.js"
import authMiddleware  from "../middlewares/authMiddleware.js";

const rota = express.Router();

// Rota para visualizar presenças, protegida por autenticação
rota.post('/viewP', authMiddleware, viewP);

rota.post('/marcarhistorico',authMiddleware,marcaHistorico);

rota.post('/viewInfo',authMiddleware,viewInformacaoP);

// Rota para marcar falta, protegida por autenticação
rota.put('/registrar', authMiddleware, marcaFalta);

// Rota para registrar aula dada, protegida por autenticação
rota.put('/aula', authMiddleware, marcaAula);

export default rota;