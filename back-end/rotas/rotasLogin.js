import express from "express";
import { loginAlunoController, loginProfessorController, loginCoordenadorController } from "../controllersrotas/controllLogin.js";

const rota = express.Router();

// Rotas de login para cada tipo de usuário
rota.post('/coordenador', loginCoordenadorController);
rota.post('/professor', loginProfessorController);
rota.post('/aluno', loginAlunoController);

export default rota;