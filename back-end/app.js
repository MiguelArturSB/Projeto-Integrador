import express from 'express';
const app = express();
import cors from 'cors';

import login from './rotas/rotasLogin.js';
import viewP from './rotas/rotasPresenca.js';
import viewA from './rotas/rotaAluno.js';
import rotaCoordenador from './rotas/rotasCoordenador.js';

app.use(cors());
app.use(express.json());

// Rotas
app.use('/aluno', viewA);
app.use('/login', login);
app.use('/coordenador', rotaCoordenador);
app.use('/professor', viewP);

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).send('Início');
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});