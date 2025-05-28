import express from "express";
import { listarProfessoresController, listarAlunosController, alunoDetalhadoController, professorDetalhadoController, criarAlunoController, criarProfessorController, atualizarAlunoController, atualizarProfessorController, excluirAlunoController, excluirProfessorController } from '../controllersrotas/controllCoordenador.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const rota = express.Router();

rota.get('/alunos', listarAlunosController)

rota.get('/professores', listarProfessoresController)

rota.post('/aluno', authMiddleware, criarAlunoController)

rota.post('/professor', authMiddleware, criarProfessorController)

rota.get('/aluno/:id', alunoDetalhadoController)

rota.get('/professor/:id', professorDetalhadoController)

rota.patch('/aluno/:id', authMiddleware, atualizarAlunoController)

rota.patch('/professor/:id', authMiddleware, atualizarProfessorController)

rota.delete('/aluno/:id', authMiddleware, excluirAlunoController)

rota.delete('/professor/:id', authMiddleware, excluirProfessorController)

export default rota;