import {viewAluno} from '../database/database.js';


const viewA = async (req, res) => {
  try {
    console.log('Recebido no backend:', req.body);  // <-- log para debug

    const { idAluno } = req.body;

    // Optional: forçar null se undefined
    const safealunoID = idAluno ?? null;

    const view = await viewAluno(safealunoID);

    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view });
  } catch (err) {
    console.error('Erro ao criar view: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar view' });
  }
};


export {viewA };