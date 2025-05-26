import express from "express";
import { viewP,marcaFalta,marcaAula,} from "../controllersrotas/controllPresenca.js"
import authMiddleware  from "../middlewares/authMiddleware.js";

const rota = express.Router()


// rota.post('/professor', loginProfessorController)

rota.post('/viewP',authMiddleware,viewP);

rota.put('/registrar',authMiddleware,marcaFalta);

rota.put('/aula',authMiddleware,marcaAula);
// 




export default rota