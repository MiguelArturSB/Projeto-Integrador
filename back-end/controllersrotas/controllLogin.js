import jwt from 'jsonwebtoken';
import { read, compare } from '../database/database.js';
import { JWT_SECRET } from '../database/jwt.js';

const loginAlunoController = async (req, res) => {
    const { RA_aluno, senha_aluno } = req.body;

    try {
        const Aluno = await read('Alunos', `RA_aluno = '${RA_aluno}'`);

        if (!Aluno) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        // isso e nessesario
        const alunoEncontrado = Aluno;

        if (!alunoEncontrado.senha_aluno) {
            return res.status(500).json({ mensagem: 'Erro interno: dados incompletos do usuário' });
        }

        const senhaCorreta = await compare(senha_aluno,alunoEncontrado.senha_aluno);
        console.log("Senha recebida:", senha_aluno);
        console.log("Senha no banco (hash):", alunoEncontrado.senha_aluno);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }
                                    //precisa ser o id do banco de dados
        const token = jwt.sign({ idAluno: alunoEncontrado.ID_aluno, tipo:alunoEncontrado.tipo }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};



const loginProfessorController = async (req, res) => {
    const { cpf_professor, senha_professor } = req.body;

    try {
        const Professore = await read('Professores', `cpf_professor = '${cpf_professor}'`);


        if (!Professore) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const senhaCorreta = await compare(senha_professor, Professore.senha_professor);


        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        const token = jwt.sign({
    id: Professore.id,
    tipo: Professore.tipo,
    turma_professor: Professore.turma_professor, 
    materia: Professore.materia             
  }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};





const loginCoordenadorController = async (req, res) => {
    const { cpf_coordenador, senha_coordenador } = req.body;

    try {
        const Coordenador = await read('Coordenador', `cpf_coordenador = '${cpf_coordenador}'`);

        if (!Coordenador) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const senhaCorreta = await compare(senha_coordenador, Coordenador.senha_coordenador);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: Coordenador.id, tipo: Coordenador.tipo }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};



export { loginCoordenadorController, loginProfessorController, loginAlunoController };
