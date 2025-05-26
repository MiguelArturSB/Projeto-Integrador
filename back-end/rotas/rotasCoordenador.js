import express from "express";
import {listarUsuariosController, alunoDetalhadoController, professorDetalhadoController, criarAlunoController, criarProfessorController, atualizarAlunoController, atualizarProfessorController, excluirAlunoController, excluirProfessorController} from '../controllersrotas/controllCoordenador.js'
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'))
    }, 
    flien: (req, file, cb)=> {
        const nomeArquivo = `${Date.now()}-${file.originalname}`
        cb(null, nomeArquivo)
    }
})

const uploads = multer({storage: storage})

const router = express.Router();

router.get('/', listarUsuariosController)

router.post('/criaraluno', authMiddleware, criarAlunoController)

router.post('/criarprofessor', authMiddleware, criarProfessorController)

router.get('/aluno/:id', alunoDetalhadoController);

router.get('/professor/:id', professorDetalhadoController);

router.put('/aluno/:id', authMiddleware, atualizarAlunoController)

router.put('/professor/:id', authMiddleware, atualizarProfessorController)

router.delete('/aluno/:id', authMiddleware, excluirLivrosController)

router.options('/', (req, res) => {
    res.setHeaders('Allow', 'GET, OPTIONS')
    res.status(204).send()
})

router.options('/:id', (req, res) => {
    res.setHeaders('Allow', 'GET, PUT, DELETE, OPTIONS')
    res.status(204).send()
})

export default router;