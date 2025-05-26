import express from 'express';
const app = express();
const port = 3001;
import cors from 'cors'

import os from 'os';

// import rotaAlunoLogin from './rotas/rotasLogin.js'
// import rotaProfessorLogin from './rotas/rotasLogin.js'
// import rotaCoordenadorLogin from './rotas/rotasLogin.js'

import login from './rotas/rotasLogin.js'
import viewP from './rotas/rotasPresenca.js'
import viewA from './rotas/rotaAluno.js';

app.use(cors())
app.use(express.json());

app.use('/aluno', viewA)

app.use('/login', login)


app.use('/presenca', viewP)

app.get('/', (req,res) => {
    res.status(200).send(`Início`)
});

app.use((req,res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' })
});






//isso aqui ta
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
        // Verifica se o IP está nas faixas privadas
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


