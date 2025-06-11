import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

/**
 * Cria um pool de conexões para o MySQL.
 */
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DataBase_Prof_Tereza_Costa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

/**
 * Obtém uma conexão do pool.
 */
async function getConnection() {
  return pool.getConnection();
};

/**
 * Lê todos os registros de uma tabela, com condição opcional.
 * @param {string} table - Nome da tabela
 * @param {string|null} where - Condição WHERE opcional
 */
async function readAll(table, where = null) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    const [rows] = await connection.execute(sql);
    return rows;
  } finally {
    connection.release();
  }
}

/**
 * Lê um registro único da tabela.
 * @param {string} table - Nome da tabela
 * @param {string} where - Condição WHERE
 * @param {Array} params - Parâmetros da condição WHERE
 */
async function read(table, where, params = []) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    const [rows] = await connection.execute(sql, params);
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

/**
 * Insere um registro na tabela e retorna o ID gerado.
 * @param {string} table - Nome da tabela
 * @param {Object} data - Dados para inserção
 */
async function create(table, data) {
  const connection = await getConnection();
  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const values = Object.values(data);
    const [result] = await connection.execute(sql, values);
    return result.insertId;
  } finally {
    connection.release();
  }
}

/**
 * Atualiza registros da tabela conforme condição e dados.
 * @param {string} table - Nome da tabela
 * @param {Object} data - Dados a serem atualizados
 * @param {string} where - Condição WHERE
 */
async function update(table, data, where) {
  const connection = await getConnection();
  try {
    const set = Object.keys(data).map(col => `${col} = ?`).join(', ');
    const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
    const values = Object.values(data);
    const [result] = await connection.execute(sql, values);
    return result.affectedRows;
  } finally {
    connection.release();
  }
}

/**
 * Exclui registros de uma tabela conforme condição.
 * @param {string} table - Nome da tabela
 * @param {string} where - Condição WHERE
 * @param {Array} params - Parâmetros da condição WHERE
 */
async function deleteRecord(table, where, params = []) {
  const connection = await getConnection();
  try {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const [result] = await connection.execute(sql, params);
    return result; 
  } finally {
    connection.release();
  }
}

/**
 * Compara senha em texto puro com hash bcrypt.
 * @param {string} senha - Senha em texto puro
 * @param {string} hash - Hash da senha
 */
async function compare(senha, hash) {
  try {
    return await bcrypt.compare(senha, hash);
  } catch {
    return false;
  }
}

/**
 * Visualiza presença dos alunos em uma turma e matéria específica.
 * @param {string} turma_aluno - Turma do aluno
 * @param {string} materia - Matéria
 */
async function viewPresenca(turma_aluno, materia) {
  const connection = await getConnection();
  try {
    const sql = `SELECT * FROM freq_turma WHERE turma = ? AND materia = ?;`;
    const [result] = await connection.execute(sql, [turma_aluno, materia]);
    return result;
  } finally {
    connection.release();
  }
}

/**
 * Visualiza detalhes do aluno.
 * @param {number} idAluno - ID do aluno
 */
async function viewAluno(idAluno) {
  const connection = await getConnection();
  try {
    const sql = `
      SELECT nome_aluno, RA_aluno, turma, materia, faltas, total_faltas, total_aulas_turma, percentual_frequencia
      FROM total_aluno
      WHERE ID_aluno = ?
    `;
    const [result] = await connection.execute(sql, [idAluno]);
    return result;
  } finally {
    connection.release();
  }
}

/**
 * Lê todos os dados da view de frequência da turma.
 */
async function readAllView() {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM database_prof_tereza_costa.freq_turma;`;
    const [rows] = await connection.execute(sql);
    return rows;
  } finally {
    connection.release();
  }
}

/**
 * Cria registro de falta no histórico do aluno.
 * @param {number} ID_professor - ID do professor
 * @param {number} ID_aluno - ID do aluno
 * @param {string} materia - Matéria
 */
async function creatHistorico(ID_professor, ID_aluno, materia) {
  const connection = await getConnection();
  try {
    const sql = `
      INSERT INTO historico_aluno (ID_professor, ID_aluno, materia, data_falta)
      VALUES (?, ?, ?, ?)
    `;
    // Gera a data atual no formato 'YYYY-MM-DD'
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];

    const [result] = await connection.execute(sql, [
      ID_professor,
      ID_aluno,
      materia,
      dataFormatada
    ]);

    return result;
  } finally {
    connection.release();
  }
}

/**
 * Visualiza o histórico completo de faltas de um aluno.
 * @param {number} idAluno - ID do aluno
 */
async function viewHistoricaAluno(idAluno) {
  const connection = await getConnection();
  try {
    const sql = `SELECT * FROM vw_historico_completo WHERE ID_aluno = ?;`;
    const [result] = await connection.execute(sql, [idAluno]);
    return result;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err;
  } finally {
    connection.release();
  }
}

/**
 * Visualiza informações do professor pelo ID.
 * @param {number} idProfessor - ID do professor
 */
async function viewProfessor(idProfessor) {
  const connection = await getConnection();
  try {
    const sql = `SELECT nome_professor, cpf_professor, turma_professor
                  FROM total_aluno
                  WHERE ID_professor = ?`;
    const [result] = await connection.execute(sql, [idProfessor]);
    return result;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err;
  } finally {
    connection.release();
  }
}

/**
 * Marca falta para o aluno em uma matéria específica (soma 4 faltas).
 * @param {string} materia - Matéria (LER, ARI, LOPAL, PBE, SOP)
 * @param {number} id - ID do aluno
 */
async function faltaAluno(materia, id = null) {
  const connection = await getConnection();
  try {
    const materiaMap = {
      LER: 'freq_LER',
      ARI: 'freq_ARI',
      LOPAL: 'freq_LOPAL',
      PBE: 'freq_PBE',
      SOP: 'freq_SOP'
    };
    const coluna = materiaMap[materia];
    if (!coluna) throw new Error('Coluna de matéria inválida');
    const sql = `UPDATE freq_aulas SET ${coluna} = ${coluna} + ? WHERE ID_aluno = ?`;
    const [result] = await connection.execute(sql, [4, id]);
    if (result.affectedRows === 0) throw new Error('Aluno não encontrado');
    return result.affectedRows;
  } finally {
    connection.release();
  }
}

/**
 * Atualiza número de aulas dadas para o professor relacionado a um aluno e matéria.
 * @param {string} materia - Matéria
 * @param {number} idAluno - ID do aluno
 */
const atualizarAulasDadasProfessor = async (materia, idAluno) => {
  const connection = await getConnection();
  try {
    const sql = `
      UPDATE Professores p
      JOIN Alunos a ON a.turma = p.turma_professor
      SET p.aulas_dadas = COALESCE(p.aulas_dadas, 0) + 4
      WHERE a.ID_aluno = ? AND p.materia = ?;
    `;
    const [result] = await connection.execute(sql, [idAluno, materia]);
    return result.affectedRows;
  } finally {
    connection.release();
  }
};

/**
 * Lista todos os alunos, com filtro opcional.
 * @param {string|null} where - Condição WHERE opcional
 * @param {Array} values - Parâmetros do filtro
 */
async function listarAlunos(where = null, values = []) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM Alunos`;
    if (where) sql += ` WHERE ${where}`;
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    connection.release();
  }
}

/**
 * Lista todos os professores, com filtro opcional.
 * @param {string|null} where - Condição WHERE opcional
 * @param {Array} values - Parâmetros do filtro
 */
async function listarProfessores(where = null, values = []) {
  const connection = await getConnection(); 
  try {
    let sql = `SELECT * FROM Professores`;
    if (where) sql += ` WHERE ${where}`;
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    connection.release(); 
  }
}

export {
  listarProfessores,
  listarAlunos,
  readAll,
  read,
  create,
  update,
  deleteRecord,
  compare,
  viewPresenca,
  faltaAluno,
  atualizarAulasDadasProfessor,
  viewAluno,
  viewProfessor,
  creatHistorico,
  viewHistoricaAluno,
  readAllView
};