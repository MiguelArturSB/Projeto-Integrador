import { viewPresenca, faltaAluno,atualizarAulasDadasProfessor,viewProfessor} from '../database/database.js';

const viewP = async (req, res) => {
  try {
    

    const { turmaProfessor, turma, materia } = req.body;

    // Optional: forçar null se undefined
    const safeTurmaProfessor = turmaProfessor ?? null;
    const safeTurma = turma ?? null;
    const safeMateria = materia ?? null;

    const view = await viewPresenca(safeTurmaProfessor, safeTurma, safeMateria);

    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  } catch (err) {
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
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



const marcaFalta = async (req, res) => {
  try {
    const { materia,id } = req.body;

    const falta = await faltaAluno( materia,id);
    
    res.status(201).json({ mensagem: 'falta dada com sucesso!!!',falta });
  } catch (err) {
    console.error('Erro ao dar falta: ', err);
    res.status(500).json({ mensagem: 'Erro ao dar falta' });
  }
};




const marcaAula = async (req, res) => {
  const { idAluno, materia } = req.body;

  if (idAluno === undefined || materia === undefined) {
    return res.status(400).json({ error: 'idAluno e materia são obrigatórios' });
  }

  try {
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





export {viewP,marcaFalta,marcaAula,viewInformacaoP};