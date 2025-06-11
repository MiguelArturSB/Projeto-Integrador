// Importa funções de manipulação de dados e dependências necessárias
import { readAllView } from '../database/database.js'

import { 
    listarAlunos, listarProfessores, alunoDetalhado, professorDetalhado, 
    criarAluno, criarProfessor, atualizarAluno, atualizarProfessor, 
    excluirAluno, excluirProfessor
} from '../configs/configCoordenador.js'

import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs' // Para criptografar senhas
import path from 'path'

// Configuração de diretório
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Controller para listar todos os alunos
const listarAlunosController = async (req, res) => {
    try {
        const alunos = await listarAlunos()
        res.status(200).send(alunos)
    } catch (err) {
        console.error('Erro ao listar alunos:', err)
        res.status(500).json({ mensagem: 'Erro ao listar alunos' })
    }
}

// Controller para listar tudo para os graficos
const listarTudoController = async (req, res) => {
    try {
        const listar = await readAllView()
        res.status(200).send(listar)
    } catch (err) {
        console.error('Erro ao listar professores:', err)
        res.status(500).json({ mensagem: 'Erro ao listar professores' })
    }
}



// Controller para listar todos os professores
const listarProfessoresController = async (req, res) => {
    try {
        const professores = await listarProfessores()
        res.status(200).send(professores)
    } catch (err) {
        console.error('Erro ao listar professores:', err)
        res.status(500).json({ mensagem: 'Erro ao listar professores' })
    }
}

// Detalhar aluno por ID
const alunoDetalhadoController = async (req, res) => {
    try {
        const aluno = await alunoDetalhado(req.params.id);
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ mensagem: 'Não foi possível encontrar o aluno' });
        }
    } catch (err) {
        console.error('Erro ao obter aluno por ID: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter aluno por ID' })
    }
}

// Detalhar professor por ID
const professorDetalhadoController = async (req, res) => {
    try {
        const professor = await professorDetalhado(req.params.id);
        if (professor) {
            res.status(200).json(professor);
        } else {
            res.status(404).json({ mensagem: 'Não foi possível encontrar o professor' });
        }
    } catch (err) {
        console.error('Erro ao obter professor por ID: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter professor por ID' })
    }
}

// Cria um novo aluno (inclui hash da senha)
const criarAlunoController = async (req, res) => {
    try {
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body

        // Gera hash da senha
        const senhaHash = await bcrypt.hash(senha_aluno, 10);

        const dadosAluno = {
            nome_aluno,
            turma,
            RA_aluno,
            senha_aluno: senhaHash
        }

        const ID_aluno = await criarAluno(dadosAluno)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso!!!', ID_aluno })
    } catch (err) {
        console.error('Erro ao criar aluno: ', err)
        res.status(500).json({ mensagem: 'Erro ao criar aluno' })
    }
}

// Cria um novo professor (inclui hash da senha)
const criarProfessorController = async (req, res) => {
    try {
        const { nome_professor, materia, qntd_aula, aulas_dadas, turma_professor, cpf_professor, senha_professor } = req.body;

        // Gera hash da senha
        const senhaHash = await bcrypt.hash(senha_professor, 10);

        const dadosProfessor = {
            nome_professor,
            materia,
            qntd_aula,
            aulas_dadas,
            turma_professor,
            cpf_professor,
            senha_professor: senhaHash
        };

        const ID_professor = await criarProfessor(dadosProfessor);

        res.status(201).json({ mensagem: 'Usuário criado com sucesso!!!', ID_professor });
    } catch (err) {
        console.error('Erro ao criar professor: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar professor' });
    }
};

// Atualiza dados de um aluno (inclui hash da nova senha)
const atualizarAlunoController = async (req, res) => {
    try {
        const ID_aluno = req.params.id
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body

        const senhaHash = await bcrypt.hash(senha_aluno, 10);

        const dadosAluno = {
            nome_aluno,
            turma,
            RA_aluno,
            senha_aluno: senhaHash
        }

        await atualizarAluno(ID_aluno, dadosAluno)
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!!!' })
    } catch (err) {
        console.error('Erro ao atualizar aluno: ', err)
        req.status(500).json({ mensagem: 'Erro ao atualizar aluno' })
    }
}

// Atualiza dados de um professor (inclui hash da nova senha)
const atualizarProfessorController = async (req, res) => {
    try {
        const ID_professor = req.params.id
        const { nome_professor, materia, qntd_aula, aulas_dadas, turma_professor, cpf_professor, senha_professor } = req.body

        const senhaHash = await bcrypt.hash(senha_professor, 10);

        const dadosProfessor = {
            nome_professor,
            materia,
            qntd_aula,
            aulas_dadas,
            turma_professor,
            cpf_professor,
            senha_professor: senhaHash
        }

        await atualizarProfessor(ID_professor, dadosProfessor)
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!!!' })
    } catch (err) {
        console.error('Erro ao atualizar professor: ', err)
        req.status(500).json({ mensagem: 'Erro ao atualizar professor' })
    }
}

// Exclui um aluno pelo ID
const excluirAlunoController = async (req, res) => {
    try {
        const ID_aluno = req.params.id
        await excluirAluno(ID_aluno)
        res.status(200).json({ mensagem: 'Usuário excluido com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir aluno: ', err)
        res.status(500).json({ mensagem: 'Erro ao excluir aluno' })
    }
}

// Exclui um professor pelo ID
const excluirProfessorController = async (req, res) => {
    try {
        const ID_professor = req.params.id
        await excluirProfessor(ID_professor)
        res.status(200).json({ mensagem: 'Usuário excluido com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir professor: ', err)
        res.status(500).json({ mensagem: 'Erro ao excluir professor' })
    }
}

// Exporta todos os controllers
export { 
    listarProfessoresController,
    listarAlunosController,
    alunoDetalhadoController,
    professorDetalhadoController,
    criarAlunoController,
    criarProfessorController,
    atualizarAlunoController,
    atualizarProfessorController,
    excluirAlunoController,
    excluirProfessorController ,
    listarTudoController
}
