import express from 'express';
const app = express();
const port = 3000;
import cors from 'cors'

// import rotaAlunoLogin from './rotas/rotasLogin.js'
// import rotaProfessorLogin from './rotas/rotasLogin.js'
// import rotaCoordenadorLogin from './rotas/rotasLogin.js'

import login from './rotas/rotasLogin.js'

app.use(cors())
app.use(express.json())

// app.use('/professor', rotaProfessorLogin);
app.use('/login', login)
// app.use('/coordenador', rotaCoordenadorLogin)

app.get('/', (req,res) => {
    res.status(200).send(`Início`)
});

app.use((req,res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' })
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})