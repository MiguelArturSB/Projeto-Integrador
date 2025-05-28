import express from "express";
import {viewA} from "../controllersrotas/controllAluno.js"
import authMiddleware  from "../middlewares/authMiddleware.js";

const rota = express.Router()

rota.post('/viewA',authMiddleware,viewA);

export default rota