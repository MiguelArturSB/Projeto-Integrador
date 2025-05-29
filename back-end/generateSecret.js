import crypto from 'crypto'

// Gera uma chave secreta aleatória de 64 bytes em formato hexadecimal
function generateSecretKey() {
    return crypto.randomBytes(64).toString('hex')
}

const secretKey = generateSecretKey()

console.log('Chave Secreta Gerada: ', secretKey)