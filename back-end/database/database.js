import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Cria pool de conexões para MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DataBase_Prof_Tereza_Costa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

async function getConnection() {
  return pool.getConnection();
};

// Lê todos os registros de uma tabela com condição opcional
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

// Lê um registro único da tabela
async function read(table, where) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    const [rows] = await connection.execute(sql);
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Insere um registro na tabela e retorna o ID gerado
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

// Atualiza registros da tabela conforme condição e dados
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

// Deleta registros conforme condição
async function deleteRecord(table, where) {
  const connection = await getConnection();
  try {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const [result] = await connection.execute(sql);
    return result.affectedRows;
  } finally {
    connection.release();
  }
}

// Compara senha plain text com hash bcrypt
async function compare(senha, hash) {
  try {
    return await bcrypt.compare(senha, hash);
  } catch {
    return false;
  }
}


//mudei view
// Visualiza presença dos alunos numa turma, professor e matéria específica
async function viewPresenca( turma_aluno, materia) {
  const connection = await getConnection();
  try {
    const sql = ` SELECT * FROM freq_turma 
                  WHERE turma = ? AND materia = ?;
 `;
    const [result] = await connection.execute(sql, [turma_aluno, materia]);
    return result;
  } finally {
    connection.release();
  }
}

// Visualiza detalhes do aluno
async function viewAluno(idAluno) {
  const connection = await getConnection();
  try {
    const sql = `SELECT nome_aluno,RA_aluno,turma,materia,faltas,total_faltas,total_aulas_turma,percentual_frequencia
                  FROM total_aluno
                  WHERE ID_aluno = ?`;
    const [result] = await connection.execute(sql, [idAluno]);
    return result;
  } finally {
    connection.release();
  }
}


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


async function creatHistorico(ID_professor, ID_aluno, materia) {
  const connection = await getConnection();
  try {
    const sql = `INSERT INTO historico_aluno (ID_professor, ID_aluno, materia) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(sql, [ID_professor, ID_aluno, materia]);
    return result;
  } finally {
    connection.release();
  }
}


async function viewHistoricaAluno(idAluno) {
  const connection = await getConnection();
  try {
    const sql = `SELECT * FROM vw_historico_completo
                  WHERE ID_aluno = ?;`;

    const [result] = await connection.execute(sql, [idAluno]);
    return result;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err;
  } finally {
    connection.release();
  }
}



async function viewProfessor(idProfessor) {
  const connection = await getConnection();
  try {
    const sql = `SELECT nome_professor,cpf_professor,turma_professor
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

// Marca falta para o aluno em uma matéria específica (soma 4 faltas)
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

// Atualiza número de aulas dadas para o professor relacionado a um aluno e matéria
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




export { readAll, read, create, update, deleteRecord, compare, viewPresenca, faltaAluno, atualizarAulasDadasProfessor, viewAluno, viewProfessor, creatHistorico, viewHistoricaAluno,readAllView };