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
  excluirProfessorController 
} from '../controllersrotas/controllCoordenador.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const rota = express.Router();

// Listagem (GET) não precisa de autenticação
rota.get('/alunos', listarAlunosController);
rota.get('/professores', listarProfessoresController);

// Criar (POST) precisa de autenticação
rota.post('/aluno', authMiddleware, criarAlunoController);
rota.post('/professor', authMiddleware, criarProfessorController);

// Detalhes (GET) por ID - sem autenticação (se for informação pública, ok)
rota.get('/aluno/:id', alunoDetalhadoController);
rota.get('/professor/:id', professorDetalhadoController);

// Atualizar (PATCH) precisa de autenticação
rota.patch('/aluno/:id', authMiddleware, atualizarAlunoController);
rota.patch('/professor/:id', authMiddleware, atualizarProfessorController);

// Excluir (DELETE) precisa de autenticação
rota.delete('/aluno/:id', authMiddleware, excluirAlunoController);
rota.delete('/professor/:id', authMiddleware, excluirProfessorController);

export default rota;
