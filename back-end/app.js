import express from 'express';
const app = express();
import cors from 'cors';
import os from 'os';

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
app.use('/presenca', viewP);

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).send('Início');
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// Função para obter IP local na faixa privada
function getLocalIP() {
  const nets = os.networkInterfaces();
  const ipRanges = [
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[01])\./
  ];

  for (const name in nets) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        if (ipRanges.some((range) => range.test(net.address))) {
          return net.address;
        }
      }
    }
  }
  return 'localhost';
}

const PORT = 3001;
const HOST = '0.0.0.0';
const ip = getLocalIP();

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${ip}:${PORT}`);
});