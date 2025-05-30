import express from "express";
import { viewP,marcaFalta,marcaAula,viewInformacaoP} from "../controllersrotas/controllPresenca.js"
import authMiddleware  from "../middlewares/authMiddleware.js";

const rota = express.Router()

rota.post('/viewP',authMiddleware,viewP);

rota.post('/viewInfo',authMiddleware,viewInformacaoP);

rota.put('/registrar',authMiddleware,marcaFalta);

rota.put('/aula',authMiddleware,marcaAula);
// 




export default rota