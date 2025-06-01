// Importa a função viewAluno do módulo de banco de dados
import { viewAluno,viewHistoricaAluno } from '../database/database.js';

// Função para criar uma view de aluno a partir do ID recebido na requisição
const viewA = async (req, res) => {
  try {
    const { idAluno } = req.body; // Recebe o ID do aluno do corpo da requisição

    // Garante que o valor não seja undefined, atribuindo null se for o caso
    const safealunoID = idAluno ?? null;

    // Executa a view no banco de dados
    const view = await viewAluno(safealunoID);

    // Retorna sucesso com status 201 e o resultado da view
    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  } catch (err) {
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
  }
};


const viewHistorico = async (req, res) => {
  try {
    const { ID_aluno } = req.body; // Recebe o ID do aluno do corpo da requisição

    // Garante que o valor não seja undefined, atribuindo null se for o caso
    const safealunoID = ID_aluno ?? null;

    // Executa a view no banco de dados
    const view = await viewHistoricaAluno(safealunoID);

    // Retorna sucesso com status 201 e o resultado da view
    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  } catch (err) {
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
  }
};



// Exporta a função para uso externo
export { viewA,viewHistorico };
