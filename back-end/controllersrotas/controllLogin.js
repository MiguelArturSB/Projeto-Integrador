// Importa bibliotecas necessárias
import jwt from 'jsonwebtoken';
import { read, compare } from '../database/database.js';
import { JWT_SECRET } from '../database/jwt.js';

// Login para aluno
const loginAlunoController = async (req, res) => {
    const { RA_aluno, senha_aluno } = req.body;

    try {
        // Busca aluno no banco pelo RA
        const Aluno = await read('Alunos', `RA_aluno = '${RA_aluno}'`);

        if (!Aluno) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Verifica se senha existe no banco
        if (!Aluno.senha_aluno) {
            return res.status(500).json({ mensagem: 'Erro interno: dados incompletos do usuário' });
        }

        // Compara senha enviada com a senha do banco (hash)
        const senhaCorreta = await compare(senha_aluno, Aluno.senha_aluno);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Gera token JWT contendo ID do aluno e tipo de usuário
        const token = jwt.sign(
            { idAluno: Aluno.ID_aluno, tipo: Aluno.tipo }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

// Login para professor
const loginProfessorController = async (req, res) => {
    const { cpf_professor, senha_professor } = req.body;

    try {
        // Busca professor no banco pelo CPF
        const Professore = await read('Professores', `cpf_professor = '${cpf_professor}'`);

        if (!Professore) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Compara senha enviada com a senha do banco (hash)
        const senhaCorreta = await compare(senha_professor, Professore.senha_professor);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Gera token JWT com dados do professor (inclui turma e matéria)
        const token = jwt.sign(
            {
                id: Professore.id,
                tipo: Professore.tipo,
                turma_professor: Professore.turma_professor,
                materia: Professore.materia
            }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

// Login para coordenador
const loginCoordenadorController = async (req, res) => {
    const { cpf_coordenador, senha_coordenador } = req.body;

    try {
        // Busca coordenador no banco pelo CPF
        const Coordenador = await read('Coordenador', `cpf_coordenador = '${cpf_coordenador}'`);

        if (!Coordenador) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Compara senha enviada com a senha do banco (hash)
        const senhaCorreta = await compare(senha_coordenador, Coordenador.senha_coordenador);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Gera token JWT com ID e tipo do coordenador
        const token = jwt.sign(
            { id: Coordenador.id, tipo: Coordenador.tipo }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

// Exporta os controllers de login
export { 
    loginCoordenadorController, 
    loginProfessorController, 
    loginAlunoController 
};
