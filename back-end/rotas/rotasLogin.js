import express from "express";
import { loginAlunoController,loginProfessorController,loginCoordenadorController} from "../controllersrotas/controllLogin.js"


const rota = express.Router()


// rota.post('/professor', loginProfessorController)

rota.post('/coordenador', loginCoordenadorController)

rota.post('/professor',loginProfessorController);

rota.post('/aluno', loginAlunoController);





export default rota