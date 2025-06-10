import express from "express";
import {
  listarProfessoresController,
  listarAlunosController,
  alunoDetalhadoController,
  professorDetalhadoController,
  criarAlunoController,
  criarProfessorController,
  atualizarAlunoController,
  atualizarProfessorController,
  excluirAlunoController,
  excluirProfessorController,
  listarTudoController

} from '../controllersrotas/controllCoordenador.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const rota = express.Router();

//lista a view de tudo
rota.get('/listar', authMiddleware, listarTudoController);

// Listagem (GET) não precisa de autenticação
rota.post('/alunos', listarAlunosController);
rota.post('/professores', listarProfessoresController);

// Criar (POST) precisa de autenticação
rota.post('/aluno', authMiddleware, criarAlunoController);
rota.post('/professor', authMiddleware, criarProfessorController);

// Detalhes (GET) por ID - sem autenticação (se for informação pública, ok)
rota.get('/aluno', alunoDetalhadoController);
rota.get('/professor', professorDetalhadoController);

// Atualizar (PATCH) precisa de autenticação
rota.patch('/aluno', authMiddleware, atualizarAlunoController);
rota.patch('/professor', authMiddleware, atualizarProfessorController);

// Excluir (DELETE) precisa de autenticação
rota.delete('/aluno', authMiddleware, excluirAlunoController);
rota.delete('/professor', authMiddleware, excluirProfessorController);

export default rota;
