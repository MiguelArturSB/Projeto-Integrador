import { readAll, read, create, update, deleteRecord } from '../database/database.js';

const listarAlunos = async () => {
    try {
        return await readAll('Alunos');
    } catch (err) {
        console.error('Erro ao listar usuários: ', err);
        throw err;
    }
}

const listarProfessores = async () => {
    try {
        return await readAll('Professores');
    } catch (err) {
        console.error('Erro ao listar usuários: ', err);
        throw err;
    }
}

const alunoDetalhado = async (id) => {
    try {
        return await read('Alunos', `ID_aluno = ${id}`);
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
}

const professorDetalhado = async (id) => {
    try {
        return await read('Professores', `ID_professor = ${id}`);
    } catch (err) {
        console.error('Erro ao exibir usuário: ', err);
        throw err;
    }
}

const criarAluno = async (dadosAluno) => {
    try {
        return await create('Alunos', dadosAluno);
    } catch (err) {
        console.error('Erro ao criar usuário: ', err)
        throw err
    }
}

const criarProfessor = async (dadosProfessor) => {
    try {
        return await create('Professores', dadosProfessor);
    } catch (err) {
        console.error('Erro ao criar usuário: ', err)
        throw err
    }
}

const atualizarAluno = async (id, dadosAluno) => {
    try {
        return await update('Alunos', dadosAluno, `ID_aluno = ${id}`)
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err)
        throw err
    }
}

const atualizarProfessor = async (id, dadosProfessor) => {
    try {
        return await update('Professores', dadosProfessor, `ID_professor = ${id}`)
    } catch (err) {
        console.error('Erro ao atualizar usuário: ', err)
        throw err
    }
}

const excluirAluno = async (id) => {
    try {
        return await deleteRecord('Alunos', `ID_aluno = ${id}`)
    } catch (err) {
        console.error('Erro ao excluir usuário: ', err)
        throw err
    }
}

const excluirProfessor = async (id) => {
    try {
        return await deleteRecord('Professores', `ID_professor = ${id}`)
    } catch (err) {
        console.error('Erro ao excluir usuário: ', err)
        throw err
    }
}

export {listarAlunos, listarProfessores, alunoDetalhado, professorDetalhado, criarAluno, criarProfessor, atualizarAluno, atualizarProfessor, excluirAluno, excluirProfessor}