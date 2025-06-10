// Importa funções de manipulação do banco de dados
import { readAll, read, create, update, deleteRecord,readAllView } from '../database/database.js';

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
const alunoDetalhado = async (RA_aluno) => {
    try {
        return await read('Alunos', `RA_aluno = ${RA_aluno}`);
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
}

// Busca detalhes de um professor específico pelo ID
const professorDetalhado = async (cpf_professor) => {
    try {
        return await read('professores', `cpf_professor = '${cpf_professor}'`); 
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
};



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
const atualizarAluno = async (RA, dadosAluno) => {
    try {
        return await update('Alunos', dadosAluno, `RA_aluno = ${RA}`);
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err);
        throw err;
    }
}

// Atualiza dados de um professor específico
const atualizarProfessor = async (cpf, dadosProfessor) => {
    try {
        return await update('Professores', dadosProfessor, `cpf_professor = '${cpf}'`);
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err);
        throw err;
    }
};


// Exclui um aluno específico
const excluirAluno = async (RA) => {
    try {
        return await deleteRecord('Alunos', `RA_aluno = ${RA}`);
    } catch (err) {
        console.error('Erro ao excluir usuário: ', err);
        throw err;
    }
}

// Exclui um professor específico
const excluirProfessor = async (cpf) => {
    try {
        return await deleteRecord('Professores', `cpf_professor = ${cpf}`);
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
    excluirProfessor,
    
}
