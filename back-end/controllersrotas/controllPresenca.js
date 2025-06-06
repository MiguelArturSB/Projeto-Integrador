// Importa funções do banco de dados
import { viewPresenca, faltaAluno, atualizarAulasDadasProfessor,viewProfessor,creatHistorico  } from '../database/database.js';

//mudei controller e view


//mudei controller e view
// Cria a view de presença com base nos filtros recebidos
const viewP = async (req, res) => {
  try {
    console.log('Recebido no backend:', req.body);  // <-- log para debug

    const { turma, materia } = req.body;

    // Garante que os valores não sejam undefined
    const safeTurma = turma ?? null;
    const safeMateria = materia ?? null;

    // Busca a view de presença no banco
    const view = await viewPresenca( safeTurma, safeMateria);

    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  } catch (err) {
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
  }
};



// Marca falta para um aluno em uma determinada matéria
const marcaFalta = async (req, res) => {
  try {
    const { materia, id } = req.body;

    const falta = await faltaAluno( materia,id);
    
    res.status(201).json({ mensagem: 'falta dada com sucesso!!!',falta });
  } catch (err) {
    console.error('Erro ao dar falta: ', err);
    res.status(500).json({ mensagem: 'Erro ao dar falta' });
  }
};



const viewInformacaoP = async (req,res) =>{
  try{
    const {idProfessor} = req.body;
    console.log('Corpo da requisição:', req.body);

    console.log(idProfessor)
    const safeidProfessor = idProfessor ?? null;
    
    const view = await viewProfessor(safeidProfessor)
res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  }catch (err){
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
  }
}



const marcaHistorico = async (req, res) => {
  try {
    const { ID_professor, ID_aluno, materia } = req.body;

    // Verifica se algum campo está undefined
    if (ID_professor === undefined || ID_aluno === undefined || materia === undefined) {
      return res.status(400).json({ mensagem: 'ID_professor, ID_aluno e materia são obrigatórios' });
    }

    const faltaHistorico = await creatHistorico(ID_professor, ID_aluno, materia);

    res.status(201).json({ mensagem: 'Falta dada com sucesso!!!', faltaHistorico });
  } catch (err) {
    console.error('Erro ao dar falta: ', err);
    res.status(500).json({ mensagem: 'Erro ao dar falta' });
  }
};




// Atualiza o número de aulas dadas por um professor em uma matéria
const marcaAula = async (req, res) => {
  const { idAluno, materia } = req.body;

  // Verifica se os campos obrigatórios foram enviados
  if (idAluno === undefined || materia === undefined) {
    return res.status(400).json({ error: 'idAluno e materia são obrigatórios' });
  }

  try {
    // Atualiza as aulas dadas no banco
    const affectedRows = await atualizarAulasDadasProfessor(materia, idAluno);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Nenhum professor encontrado para atualizar' });
    }

    res.status(200).json({ message: 'Aulas atualizadas com sucesso', affectedRows });
  } catch (error) {
    console.error('Erro ao atualizar aulas dadas do professor:', error);
    res.status(500).json({ error: error.message });
  }
};





export {viewP,marcaFalta,marcaAula,viewInformacaoP,marcaHistorico};