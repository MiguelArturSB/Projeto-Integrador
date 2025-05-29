// Importa funções de manipulação do banco de dados
import { readAll, read, create, update, deleteRecord } from '../database/database.js';

// Lista todos os alunos
const listarAlunos = async () => {
    try {
        return await readAll('Alunos');
    } catch (err) {
        console.error('Erro ao listar usuários: ', err);
        throw err;
    }
}

// Lista todos os professores
const listarProfessores = async () => {
    try {
        return await readAll('Professores');
    } catch (err) {
        console.error('Erro ao listar usuários: ', err);
        throw err;
    }
}

// Busca detalhes de um aluno específico pelo ID
const alunoDetalhado = async (id) => {
    try {
        return await read('Alunos', `ID_aluno = ${id}`);
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
}

// Busca detalhes de um professor específico pelo ID
const professorDetalhado = async (id) => {
    try {
        return await read('Professores', `ID_professor = ${id}`);
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
}

// Cria um novo aluno
const criarAluno = async (dadosAluno) => {
    try {
        return await create('Alunos', dadosAluno);
    } catch (err) {
        console.error('Erro ao criar usuário: ', err);
        throw err;
    }
}

// Cria um novo professor
const criarProfessor = async (dadosProfessor) => {
    try {
        return await create('Professores', dadosProfessor);
    } catch (err) {
        console.error('Erro ao criar usuário: ', err);
        throw err;
    }
}

// Atualiza dados de um aluno específico
const atualizarAluno = async (id, dadosAluno) => {
    try {
        return await update('Alunos', dadosAluno, `ID_aluno = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err);
        throw err;
    }
}

// Atualiza dados de um professor específico
const atualizarProfessor = async (id, dadosProfessor) => {
    try {
        return await update('Professores', dadosProfessor, `ID_professor = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err);
        throw err;
    }
}

// Exclui um aluno específico
const excluirAluno = async (id) => {
    try {
        return await deleteRecord('Alunos', `ID_aluno = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir usuário: ', err);
        throw err;
    }
}

// Exclui um professor específico
const excluirProfessor = async (id) => {
    try {
        return await deleteRecord('Professores', `ID_professor = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir usuário: ', err);
        throw err;
    }
}

// Exporta todas as funções
export {
    listarAlunos,
    listarProfessores,
    alunoDetalhado,
    professorDetalhado,
    criarAluno,
    criarProfessor,
    atualizarAluno,
    atualizarProfessor,
    excluirAluno,
    excluirProfessor
}
