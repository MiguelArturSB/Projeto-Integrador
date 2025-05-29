import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../database/jwt.js'

// Middleware para proteger rotas que precisam de autenticação
const authMiddleware = (req, res, next) => {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization

    // Se não tiver token, retorna erro 401 (não autorizado)
    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Não autorizado: token não fornecido' })
    }

    // Extrai o token do formato "Bearer <token>"
    const [, token] = authHeader.split(' ')

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, JWT_SECRET)

        // Salva o id do usuário no request para uso nas próximas funções
        req.usuarioId = decoded.id

        // Continua para o próximo middleware ou rota
        next()
    } catch (err) {
        // Token inválido: retorna erro 403 (proibido)
        return res.status(403).json({ mensagem: 'Não autorizado: Token inválido' })
    }
}

export default authMiddleware
