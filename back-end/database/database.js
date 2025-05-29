import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

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


async function readAll(table, where = null) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) {
      sql += ` WHERE ${where}`
    }

    const [rows] = await connection.execute(sql);
    return rows;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err
  } finally {
    connection.release();
  }
}



async function read(table, where) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) {
      sql += ` WHERE ${where}`;
    }

    const [rows] = await connection.execute(sql);
    return rows[0] || null;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err
  } finally {
    connection.release();
  }
}

async function create(table, data) {
  const connection = await getConnection();
  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Array(Object.keys(data).length).fill('?').join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    const values = Object.values(data);

    const [result] = await connection.execute(sql, values);

    return result.insertId;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err
  } finally {
    connection.release();
  }
}

async function update(table, data, where) {
  const connection = await getConnection();
  try {
    const set = Object.keys(data)
      .map(column => `${column} = ?`)
      .join(', ');

    const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
    const values = Object.values(data);

    const [result] = await connection.execute(sql, [...values]);
    return result.affectedRows;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err
  } finally {
    connection.release();
  }
}

async function deleteRecord(table, where) {
  const connection = await getConnection();
  try {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const [result] = await connection.execute(sql);
    return result.affectedRows;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err
  } finally {
    connection.release();
  }
}

async function compare(senha, hash) {
  try {
    return await bcrypt.compare(senha, hash)
  } catch (err) {
    console.error('Erro ao comprarar a senha com o hash: ', err);
    return false;
  }
}


async function viewPresenca(turma_professor, turma_aluno, materia) {
  const connection = await getConnection();
  try {
    const sql = `SELECT ID_aluno, nome_aluno, RA_aluno, percentual_frequencia
                  FROM freq_turma
                  WHERE turma_professor = ?
                    AND turma = ?
                    AND materia = ?`;

    const [result] = await connection.execute(sql, [turma_professor, turma_aluno, materia]);
    return result;
  } catch (err) {
    console.error('Erro ao ler registros: ', err);
    throw err;
  } finally {
    connection.release();
  }
}



async function viewAluno(idAluno) {
  const connection = await getConnection();
  try {
    const sql = `SELECT nome_aluno,RA_aluno,turma,materia,faltas,total_faltas,total_aulas_turma,percentual_frequencia
                  FROM total_aluno
                  WHERE ID_aluno = ?`;

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



async function faltaAluno(materia, id = null) {
  const connection = await getConnection();
  try {
    // Mapeia nomes simples para os nomes reais das colunas
    const materiaMap = {
      LER: 'freq_LER',
      ARI: 'freq_ARI',
      LOPAL: 'freq_LOPAL',
      PBE: 'freq_PBE',
      SOP: 'freq_SOP'
    };

    const coluna = materiaMap[materia];

    if (!coluna) {
      throw new Error('Coluna de matéria inválida');
    }

    // Faz o UPDATE somando 4 faltas
    const sql = `UPDATE freq_aulas SET ${coluna} = ${coluna} + ? WHERE ID_aluno = ?`;

    const [result] = await connection.execute(sql, [4, id]);

    // Verifica se algum registro foi atualizado
    if (result.affectedRows === 0) {
      throw new Error('Aluno não encontrado na tabela freq_aulas');
    }

    return result.affectedRows;
  } catch (err) {
    console.error('Erro ao atualizar frequência:', err);
    throw err;
  } finally {
    connection.release();
  }
}




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
  } catch (error) {
    throw new Error('Erro ao atualizar aulas: ' + error.message);
  } finally {
    connection.release();
  }
};




export { readAll, read, create, update, deleteRecord, compare, viewPresenca, faltaAluno, atualizarAulasDadasProfessor, viewAluno,viewProfessor };