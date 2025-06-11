'use client'
import { useState, useEffect } from 'react';

export default function CardProfUpdate({ onUpdate }) {
    // Estados para controle de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erroBusca, setErroBusca] = useState('');

    // Estados do formulário
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [turma, setTurma] = useState('');
    const [qntdAula, setQntdAula] = useState('');

    // Estados da lógica de atualização
    const [professorOriginal, setProfessorOriginal] = useState(null);
    const [houveMudancas, setHouveMudancas] = useState(false);

    const backendUrl = `http://localhost:3001`;

    const cardData = [
        { icon: '%', titulo: 'Editar professor', descricao: 'Clique para editar os dados de um professor' }
    ];

    const limparFormulario = () => {
        setNome(''); setSenha(''); setCpf('');
        setDisciplina(''); setTurma(''); setQntdAula('');
        setProfessorOriginal(null);
        setHouveMudancas(false); setErroBusca('');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) limparFormulario();
    };

    useEffect(() => {
        if (!professorOriginal) {
            setHouveMudancas(false);
            return;
        }
        const nomeMudou = nome !== professorOriginal.nome_professor;
        const disciplinaMudou = disciplina !== professorOriginal.materia;
        const turmaMudou = turma !== professorOriginal.turma_professor;
        const qntdAulaMudou = String(qntdAula) !== String(professorOriginal.qntd_aula);
        const senhaMudou = senha !== '';

        setHouveMudancas(nomeMudou || disciplinaMudou || turmaMudou || qntdAulaMudou || senhaMudou);
    }, [nome, disciplina, turma, qntdAula, senha, professorOriginal]);

    const handleBuscar = async () => {
        if (!cpf) {
            setErroBusca("Por favor, digite o CPF para buscar.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Erro de autenticação. Faça o login novamente.");
            return;
        }
        setIsLoading(true);
        setErroBusca('');
        try {
            const cpfLimpo = cpf.replace(/\D/g, ''); 
            const filtro = { cpf_professor: cpfLimpo };
            const response = await fetch(`${backendUrl}/coordenador/professores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(filtro),
            });
            
            // --- CORREÇÃO DE TRATAMENTO DE ERRO (BUSCA) ---
            if (!response.ok) {
                // Se a resposta não for ok, define o erro e para a execução.
                const errorData = await response.json().catch(() => ({}));
                setErroBusca(errorData.mensagem || "Erro ao buscar professor.");
                return;
            }

            const professores = await response.json();
            if (professores.length === 0) {
                // Se não encontrar, define o erro e para a execução.
                setErroBusca("Nenhum professor encontrado com este CPF.");
                return;
            }
            
            carregarDadosProfessor(professores[0]);
        } catch (error) {
            console.error("Erro ao buscar professor:", error);
            setErroBusca("Erro de comunicação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!houveMudancas) {
            alert("Nenhuma alteração foi feita para salvar.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Erro de autenticação. Faça o login novamente.");
            return;
        }
        setIsLoading(true);
        setErroBusca(''); // Limpa erros antigos

        const dadosParaEnviar = {
            cpf_professor: professorOriginal.cpf_professor.replace(/\D/g, ''),
            nome_professor: nome,
            materia: disciplina,
            turma_professor: turma,
            qntd_aula: qntdAula,
            aulas_dadas: professorOriginal.aulas_dadas || 0, // Mantém o valor original
        };
        if (senha) {
            dadosParaEnviar.senha_professor = senha;
        }

        try {
            const response = await fetch(`${backendUrl}/coordenador/professor`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(dadosParaEnviar)
            });
            
            // --- CORREÇÃO DE TRATAMENTO DE ERRO (SUBMIT) ---
            if (response.ok) {
                // Se a resposta for OK, mostra o modal de sucesso.
                setIsModalOpen(false);
                setIsConfirmationOpen(true);
            } else {
                // Se não for OK, lê a mensagem de erro e a exibe.
                const erro = await response.json().catch(() => ({}));
                // Usa alert para erros de submit, pois o modal principal já fechou
                alert(`Erro ao salvar: ${erro.mensagem || "Falha ao atualizar o professor."}`);
            }

        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert(`Erro ao salvar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        limparFormulario();
        if (onUpdate) {
            onUpdate();
        }
    };

    const carregarDadosProfessor = (professor) => {
        if (professor) {
            setErroBusca('');
            setProfessorOriginal({
                nome_professor: professor.nome_professor || '',
                cpf_professor: professor.cpf_professor || '',
                materia: professor.materia || '',
                turma_professor: professor.turma_professor || '',
                qntd_aula: professor.qntd_aula || '',
                aulas_dadas: professor.aulas_dadas || 0, // Adicionado
            });
            setNome(professor.nome_professor || '');
            setCpf(formatCPF(professor.cpf_professor || ''));
            setDisciplina(professor.materia || '');
            setTurma(professor.turma_professor || '');
            setQntdAula(professor.qntd_aula || '');
            setSenha(''); 
        }
    };
    
    const formatCPF = (value) => {
        const digitos = value.replace(/\D/g, '');
        let formatado = digitos.slice(0, 11);
        if (digitos.length > 9) {
            formatado = `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9, 11)}`;
        } else if (digitos.length > 6) {
            formatado = `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}`;
        } else if (digitos.length > 3) {
            formatado = `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}`;
        }
        return formatado;
    };
    
    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\sà-üÀ-Ü]/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cpf':
                if (erroBusca) setErroBusca('');
                setCpf(formatCPF(value));
                break;
            case 'name':
                setNome(formatName(value));
                break;
            case 'senha':
                setSenha(value);
                break;
            case 'qntdAula':
                if (value.length <= 4 && /^\d*$/.test(value)) setQntdAula(value);
                break;
            case 'disciplina':
                setDisciplina(value);
                break;
            case 'turma':
                setTurma(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="card-container">
                {cardData.map((card, index) => (
                    <div key={index} className="card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-500" onClick={toggleModal}>
                        <div className="card-icon flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl mb-4">{card.icon}</div>
                        <h3 className="card-title text-lg font-semibold text-gray-800 mb-2">{card.titulo}</h3>
                        <p className="card-description text-gray-600">{card.descricao}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div id="edit-prof-modal" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm overflow-y-auto p-4">
                    <div className="relative w-full max-w-md bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900">Editar Professor</h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={toggleModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                            </button>
                        </div>
                        
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="cpf-edit" className="block mb-2 text-sm font-medium text-gray-900">CPF</label>
                                    <div className='flex items-center gap-3'>
                                        <input type="text" name="cpf" id="cpf-edit" value={cpf} onChange={handleChange} maxLength={14} disabled={professorOriginal !== null} className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed ${erroBusca ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`} placeholder="Digite o CPF para buscar" required />
                                        <button type="button" onClick={handleBuscar} disabled={isLoading || professorOriginal !== null} className='bg-blue-950 rounded-lg text-white hover:bg-blue-800 transition-all p-2 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed'>{isLoading ? '...' : 'Buscar'}</button>
                                    </div>
                                    {erroBusca && (<p className="mt-2 text-sm text-red-600">{erroBusca}</p>)}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name-edit" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                    <input type="text" name="name" id="name-edit" value={nome} maxLength={40} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="Digite o nome do professor" disabled={!professorOriginal} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="senha-edit" className="block mb-2 text-sm font-medium text-gray-900">Nova Senha (opcional)</label>
                                    <input type="password" name="senha" id="senha-edit" value={senha} maxLength={40} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="Deixe em branco para não alterar" disabled={!professorOriginal} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="qntdAula-edit" className="block mb-2 text-sm font-medium text-gray-900">Quantidade de Aulas</label>
                                    <input type="number" id="qntdAula-edit" name="qntdAula" value={qntdAula} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="Ex: 40" disabled={!professorOriginal} required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="disciplina-edit" className="block mb-2 text-sm font-medium text-gray-900">Disciplina</label>
                                    <select id="disciplina-edit" name="disciplina" value={disciplina} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" disabled={!professorOriginal} required>
                                        <option value="" disabled>Selecione</option>
                                        <option value="LER">LER</option>
                                        <option value="ARI">ARI</option>
                                        <option value="LOPAL">LOPAL</option>
                                        <option value="PBE">PBE</option>
                                        <option value="SOP">SOP</option>
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma-edit" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                                    <input type="text" id="turma-edit" name="turma" maxLength={5} value={turma} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="Ex: 2MD" disabled={!professorOriginal} required />
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading || !houveMudancas} className="w-full text-white inline-flex items-center justify-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                {isLoading ? 'Salvando...' : 'Salvar alterações'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {isConfirmationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-lg shadow p-6 max-w-sm w-full text-center">
                        <svg className="mx-auto mb-4 w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Dados do professor atualizados com sucesso!</h3>
                        <button onClick={closeConfirmation} className="w-full mt-4 px-4 py-2 bg-[#1f557b] hover:bg-[#0e3754] text-white rounded-lg cursor-pointer transition-colors">OK</button>
                    </div>
                </div>
            )}
        </>
    );
}