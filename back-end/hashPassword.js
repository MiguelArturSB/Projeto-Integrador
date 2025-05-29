import bcrypt from "bcryptjs";

// Função para gerar hash da senha 'senha123'
async function generateHashedPasssword() {
    const password = 'senha123'
    try {
        const salt = await bcrypt.genSalt(10) // gera o salt com 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt) // gera o hash da senha com o salt
        console.log('Senha Hasheada: ', hashedPassword)
        process.exit(0) // finaliza processo com sucesso
    } catch (err) {
        console.error('Erro ao hashear a senha: ', err)
        process.exit(1) // finaliza processo com erro
    }
}

generateHashedPasssword()