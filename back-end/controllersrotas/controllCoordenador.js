import { listarAlunos, listarProfessores, alunoDetalhado, professorDetalhado, criarAluno, criarProfessor, atualizarAluno, atualizarProfessor, excluirAluno, excluirProfessor } from '../configs/configCoordenador.js'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const listarAlunosController = async (req, res) => {
    try {
        const alunos = await listarAlunos()
        res.status(200).send(alunos)
    } catch (err) {
        console.error('Erro ao listar alunos:', err)
        res.status(500).json({ mensagem: 'Erro ao listar alunos' })
    }
}

const listarProfessoresController = async (req, res) => {
    try {
        const professores = await listarProfessores()
        res.status(200).send(professores)
    } catch (err) {
        console.error('Erro ao listar professores:', err)
        res.status(500).json({ mensagem: 'Erro ao listar professores' })
    }
}

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

const criarAlunoController = async (req, res) => {
    try {
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body

        // Gerar hash da senha com salt
        const senhaHash = await bcrypt.hash(senha_aluno, 10); // 10 é o salt rounds

        const dadosAluno = {
            nome_aluno: nome_aluno,
            turma: turma,
            RA_aluno: RA_aluno,
            senha_aluno: senhaHash
        }

        const ID_aluno = await criarAluno(dadosAluno)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso!!!', ID_aluno })
    } catch (err) {
        console.error('Erro ao criar aluno: ', err)
        res.status(500).json({ mensagem: 'Erro ao criar aluno' })
    }
}


const criarProfessorController = async (req, res) => {
    try {
        const {nome_professor,materia,qntd_aula,aulas_dadas,turma_professor,cpf_professor,senha_professor} = req.body;

        // Gerar hash da senha com salt
        const senhaHash = await bcrypt.hash(senha_professor, 10); // 10 é o salt rounds

        const dadosProfessor = {
            nome_professor,
            materia,
            qntd_aula,
            aulas_dadas,
            turma_professor,
            cpf_professor,
            senha_professor: senhaHash // salvar a senha já hasheada
        };

        const ID_professor = await criarProfessor(dadosProfessor);

        res.status(201).json({ mensagem: 'Usuário criado com sucesso!!!', ID_professor });
    } catch (err) {
        console.error('Erro ao criar professor: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar professor' });
    }
};

const atualizarAlunoController = async (req, res) => {
    try {
        const ID_aluno = req.params.id
        const { nome_aluno, turma, RA_aluno, senha_aluno } = req.body
        // Gerar hash da senha com salt
        const senhaHash = await bcrypt.hash(senha_aluno, 10); // 10 é o salt rounds

        const dadosAluno = {
            nome_aluno: nome_aluno,
            turma: turma,
            RA_aluno: RA_aluno,
            senha_aluno: senhaHash
        }

        console.log(`esse é os dados recebidos${dadosAluno}`)
        await atualizarAluno(ID_aluno, dadosAluno)
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!!!' })
    } catch (err) {
        console.error('Erro ao atualizar aluno: ', err)
        req.status(500).json({ mensagem: 'Erro ao atualizar aluno' })
    }
}

const atualizarProfessorController = async (req, res) => {
    try {
        const ID_professor = req.params.id
        const { nome_professor, materia, qntd_aula, aulas_dadas, turma_professor, cpf_professor, senha_professor } = req.body
        // Gerar hash da senha com salt
        const senhaHash = await bcrypt.hash(senha_professor, 10); // 10 é o salt rounds

        const dadosProfessor = {
            nome_professor: nome_professor,
            materia: materia,
            qntd_aula: qntd_aula,
            aulas_dadas: aulas_dadas,
            turma_professor: turma_professor,
            cpf_professor: cpf_professor,
            senha_professor: senhaHash
        }

        await atualizarProfessor(ID_professor, dadosProfessor)
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!!!' })
    } catch (err) {
        console.error('Erro ao atualizar professor: ', err)
        req.status(500).json({ mensagem: 'Erro ao atualizar professor' })
    }
}

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

export { listarProfessoresController, listarAlunosController, alunoDetalhadoController, professorDetalhadoController, criarAlunoController, criarProfessorController, atualizarAlunoController, atualizarProfessorController, excluirAlunoController, excluirProfessorController }