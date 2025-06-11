// Importação de funções de manipulação de dados e dependências necessárias
import { readAllView, listarAlunos, listarProfessores, read, deleteRecord } from '../database/database.js'

import {
    professorDetalhado,
    criarAluno, 
    criarProfessor, 
    atualizarAluno, 
    atualizarProfessor,
    excluirAluno, 
    excluirProfessor
} from '../configs/configCoordenador.js'

import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs' // Biblioteca para criptografar senhas
import path from 'path'

// Configuração dos diretórios de trabalho
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Controller responsável por listar alunos.
 * Permite filtrar por RA se for enviado no corpo da requisição.
 */
const listarAlunosController = async (req, res) => {
    try {
        const filtros = req.body
        let where = null
        let values = []

        if (filtros.RA_aluno) {
            where = `RA_aluno = ?`
            values.push(filtros.RA_aluno)
        }

        const alunos = await listarAlunos(where, values)
        res.status(200).send(alunos)
    } catch (err) {
        console.error('Erro ao listar alunos:', err)
        res.status(500).json({ mensagem: 'Erro ao listar alunos' })
    }
}

/**
 * Controller que retorna todos os dados para gráficos (usa uma view).
 */
const listarTudoController = async (req, res) => {
    try {
        const listar = await readAllView()
        res.status(200).send(listar)
    } catch (err) {
        console.error('Erro ao listar professores:', err)
        res.status(500).json({ mensagem: 'Erro ao listar professores' })
    }
}

/**
 * Controller para listar professores, permitindo filtro por CPF.
 */
const listarProfessoresController = async (req, res) => {
    try {
        const filtros = req.body
        let where = null
        let values = []

        // Filtro por CPF do professor se fornecido
        if (filtros && filtros.cpf_professor) {
            where = `cpf_professor = ?`
            values.push(filtros.cpf_professor)
        }

        const professores = await listarProfessores(where, values)
        res.status(200).send(professores)
    } catch (err) {
        console.error('Erro ao listar professores:', err)
        res.status(500).json({ mensagem: 'Erro ao listar professores' })
    }
}

/**
 * Controller para detalhar um aluno pelo RA.
 */
const alunoDetalhadoController = async (req, res) => {
    try {
        const { ra } = req.query
        if (!ra) return res.status(400).json({ mensagem: 'RA não informado.' })
        const dadosaluno = await read('Alunos', 'RA_aluno = ?', [ra])
        if (dadosaluno) {
            res.status(200).json({
                nome: dadosaluno.nome_aluno, // Renomeia para o front-end
                turma: dadosaluno.turma
            })
        } else {
            res.status(404).json({ mensagem: 'Não foi possível encontrar o aluno' })
        }
    } catch (err) {
        console.error('Erro ao obter aluno: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter aluno' })
    }
}

/**
 * Controller para detalhar um professor pelo CPF.
 */
const professorDetalhadoController = async (req, res) => {
    try {
        const { cpf_professor } = req.body

        const dadosProfessor = await professorDetalhado(cpf_professor)

        if (dadosProfessor) {
            res.status(200).json(dadosProfessor)
        } else {
            res.status(404).json({ mensagem: 'Não foi possível encontrar o professor' })
        }
    } catch (err) {
        console.error('Erro ao obter professor por cpf: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter professor por cpf' })
    }
}

/**
 * Controller para criar um novo aluno, realizando hash da senha.
 */
const criarAlunoController = async (req, res) => {
    try {
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body

        // Gera hash da senha
        const senhaHash = await bcrypt.hash(senha_aluno, 10)

        const dadosAluno = {
            nome_aluno,
            turma,
            RA_aluno,
            senha_aluno: senhaHash
        }

        const ID_aluno = await criarAluno(dadosAluno)
        res.status(201).json({ message: 'Aluno criado com sucesso!', ID_aluno }) // Usa 'message' por padrão

    } catch (err) {
        console.error('Erro detalhado ao criar aluno: ', err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'RA do aluno já cadastrado' })
        }
        res.status(500).json({ message: 'Erro interno no servidor ao tentar criar o aluno.' })
    }
}

/**
 * Controller para criar um novo professor, realizando hash da senha.
 */
const criarProfessorController = async (req, res) => {
    try {
        const { nome_professor, materia, qntd_aula, aulas_dadas, turma_professor, cpf_professor, senha_professor } = req.body

        // Gera hash da senha
        const senhaHash = await bcrypt.hash(senha_professor, 10)

        const dadosProfessor = {
            nome_professor,
            materia,
            qntd_aula,
            aulas_dadas,
            turma_professor,
            cpf_professor,
            senha_professor: senhaHash
        }

        const ID_professor = await criarProfessor(dadosProfessor)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso!!!', ID_professor })
    } catch (err) {
        console.error('Erro ao criar professor: ', err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'CPF do professor já cadastrado' })
        }
        res.status(500).json({ mensagem: 'Erro ao criar professor' })
    }
}

/**
 * Controller para atualizar dados de um aluno.
 */
const atualizarAlunoController = async (req, res) => {
    try {
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body

        if (!RA_aluno) {
            return res.status(400).json({ mensagem: 'O RA do aluno é obrigatório para a atualização.' })
        }

        const dadosAluno = {
            nome_aluno,
            turma,
            RA_aluno
        }

        // Atualiza a senha apenas se enviada
        if (senha_aluno && senha_aluno.trim() !== '') {
            const senhaHash = await bcrypt.hash(senha_aluno, 10)
            dadosAluno.senha_aluno = senhaHash
        }

        const numAtualizados = await atualizarAluno(RA_aluno, dadosAluno)
        if (numAtualizados === 0) {
            return res.status(404).json({ mensagem: 'Aluno não encontrado para atualização.' })
        }
        res.status(200).json({ mensagem: 'Aluno atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar aluno: ', err)
        res.status(500).json({ mensagem: 'Erro interno ao atualizar aluno' })
    }
}

/**
 * Controller para atualizar dados de um professor.
 */
const atualizarProfessorController = async (req, res) => {
    try {
        const { 
            nome_professor, 
            materia, 
            qntd_aula, 
            aulas_dadas, 
            turma_professor, 
            cpf_professor, 
            senha_professor 
        } = req.body

        if (!cpf_professor) {
            return res.status(400).json({ mensagem: 'O CPF do professor é obrigatório para a atualização.' })
        }

        // Monta objeto apenas com campos enviados
        const dadosProfessor = {}
        if (nome_professor !== undefined) dadosProfessor.nome_professor = nome_professor
        if (materia !== undefined) dadosProfessor.materia = materia
        if (qntd_aula !== undefined) dadosProfessor.qntd_aula = qntd_aula
        if (aulas_dadas !== undefined) dadosProfessor.aulas_dadas = aulas_dadas
        if (turma_professor !== undefined) dadosProfessor.turma_professor = turma_professor

        // Se senha for enviada, faz o hash
        if (senha_professor && senha_professor.trim() !== '') {
            const senhaHash = await bcrypt.hash(senha_professor, 10)
            dadosProfessor.senha_professor = senhaHash
        }

        if (Object.keys(dadosProfessor).length === 0) {
            return res.status(400).json({ mensagem: 'Nenhum dado válido foi enviado para atualização.' })
        }

        const numAtualizados = await atualizarProfessor(cpf_professor, dadosProfessor)
        if (numAtualizados === 0) {
            return res.status(404).json({ mensagem: 'Professor não encontrado para atualização.' })
        }

        res.status(200).json({ mensagem: 'Professor atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar professor: ', err)
        res.status(500).json({ mensagem: 'Erro interno ao atualizar professor' })
    }
}

/**
 * Controller para excluir um aluno pelo RA.
 */
const excluirAlunoController = async (req, res) => {
    try {
        const { RA_aluno } = req.body
        if (!RA_aluno) {
            return res.status(400).json({ mensagem: 'O RA do aluno é obrigatório.' })
        }
        const whereClause = 'RA_aluno = ?'
        const values = [RA_aluno]
        const result = await deleteRecord('Alunos', whereClause, values)
        if (result && result.affectedRows > 0) {
            res.status(200).json({ mensagem: 'Aluno excluído com sucesso.' })
        } else {
            res.status(404).json({ mensagem: 'Nenhum aluno encontrado com este RA para ser excluído.' })
        }
    } catch (err) {
        console.error('Erro ao excluir aluno:', err)
        res.status(500).json({ mensagem: 'Erro interno no servidor ao excluir aluno.' })
    }
}

/**
 * Controller para excluir um professor pelo CPF.
 */
const excluirProfessorController = async (req, res) => {
    try {
        const { cpf_professor } = req.body
        await excluirProfessor(cpf_professor)
        res.status(200).json({ mensagem: 'Usuário excluido com sucesso' })
    } catch (err) {
        console.error('Erro ao excluir professor: ', err)
        res.status(500).json({ mensagem: 'Erro ao excluir professor' })
    }
}

// Exportação de todos os controllers
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
    excluirProfessorController,
    listarTudoController
}