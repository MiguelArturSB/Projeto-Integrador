// Importa funções do banco de dados
import {
  viewPresenca,
  faltaAluno,
  atualizarAulasDadasProfessor,
  viewProfessor,
  creatHistorico
} from '../database/database.js'

/**
 * Cria a view de presença com base nos filtros de turma e matéria recebidos.
 * Retorna a lista de presenças da turma/matéria requisitada.
 */
const viewP = async (req, res) => {
  try {
    console.log('Recebido no backend:', req.body) // Log para debug

    const { turma, materia } = req.body

    // Garante que os valores não sejam undefined
    const safeTurma = turma ?? null
    const safeMateria = materia ?? null

    // Busca a view de presença no banco de dados
    const view = await viewPresenca(safeTurma, safeMateria)

    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view })
  } catch (err) {
    console.error('Erro ao criar view: ', err)
    res.status(500).json({ mensagem: 'Erro ao criar view' })
  }
}

/**
 * Marca falta para um aluno em uma determinada matéria.
 * Espera receber { materia, id } no corpo da requisição.
 */
const marcaFalta = async (req, res) => {
  try {
    const { materia, id } = req.body

    const falta = await faltaAluno(materia, id)

    res.status(201).json({ mensagem: 'Falta dada com sucesso!!!', falta })
  } catch (err) {
    console.error('Erro ao dar falta: ', err)
    res.status(500).json({ mensagem: 'Erro ao dar falta' })
  }
}

/**
 * Retorna informações detalhadas de um professor, a partir do seu ID.
 * Espera receber { idProfessor } no corpo da requisição.
 */
const viewInformacaoP = async (req, res) => {
  try {
    const { idProfessor } = req.body
    console.log('Corpo da requisição:', req.body)
    console.log(idProfessor)

    const safeidProfessor = idProfessor ?? null

    const view = await viewProfessor(safeidProfessor)
    res.status(201).json({ mensagem: 'View criado com sucesso!!!', view })
  } catch (err) {
    console.error('Erro ao criar view: ', err)
    res.status(500).json({ mensagem: 'Erro ao criar view' })
  }
}

/**
 * Marca uma falta no histórico de um aluno para uma matéria e professor.
 * Espera receber { ID_professor, ID_aluno, materia } no corpo da requisição.
 */
const marcaHistorico = async (req, res) => {
  try {
    const { ID_professor, ID_aluno, materia } = req.body

    // Verifica se algum campo está undefined
    if (ID_professor === undefined || ID_aluno === undefined || materia === undefined) {
      return res.status(400).json({ mensagem: 'ID_professor, ID_aluno e materia são obrigatórios' })
    }

    const faltaHistorico = await creatHistorico(ID_professor, ID_aluno, materia)

    res.status(201).json({ mensagem: 'Falta dada com sucesso!!!', faltaHistorico })
  } catch (err) {
    console.error('Erro ao dar falta: ', err)
    res.status(500).json({ mensagem: 'Erro ao dar falta' })
  }
}

/**
 * Atualiza o número de aulas dadas por um professor em uma determinada matéria/aluno.
 * Espera receber { idAluno, materia } no corpo da requisição.
 */
const marcaAula = async (req, res) => {
  const { idAluno, materia } = req.body

  // Verifica se os campos obrigatórios foram enviados
  if (idAluno === undefined || materia === undefined) {
    return res.status(400).json({ error: 'idAluno e materia são obrigatórios' })
  }

  try {
    // Atualiza as aulas dadas no banco
    const affectedRows = await atualizarAulasDadasProfessor(materia, idAluno)

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Nenhum professor encontrado para atualizar' })
    }

    res.status(200).json({ message: 'Aulas atualizadas com sucesso', affectedRows })
  } catch (error) {
    console.error('Erro ao atualizar aulas dadas do professor:', error)
    res.status(500).json({ error: error.message })
  }
}

// Exporta todos os controllers deste módulo
export { viewP, marcaFalta, marcaAula, viewInformacaoP, marcaHistorico }