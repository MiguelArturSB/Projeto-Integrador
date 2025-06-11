'use client'
import { useState, useEffect } from 'react';

/**
 * CardUpdateAluno
 * 
 * Componente React para editar os dados de um aluno.
 * Permite buscar aluno por RA, exibe dados e permite edição do nome, turma e senha.
 * Garante que apenas dados alterados sejam enviados. Mostra feedback de sucesso ou erro.
 * 
 * Props:
 * - onUpdate (function): callback para atualizar lista de alunos após edição.
 */
export default function CardUpdateAluno({ onUpdate }) {
    // Modais e loading
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erroBusca, setErroBusca] = useState('');

    // Campos do formulário
    const [turma, setTurma] = useState('');
    const [ra, setRa] = useState('');
    const [displayRa, setDisplayRa] = useState(''); // New state for formatted display
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    // Estado do aluno original e controle de mudanças
    const [alunoOriginal, setAlunoOriginal] = useState(null);
    const [houveMudancas, setHouveMudancas] = useState(false);

    const backendUrl = `http://localhost:3001`;

    // Dados do card de ação
    const cardData = [
        { icon: '%', titulo: 'Editar aluno', descricao: 'Clique para editar os dados de um aluno' }
    ];

    /**
     * Limpa campos do formulário e estados auxiliares
     */
    const limparFormulario = () => {
        setTurma(''); 
        setRa(''); 
        setDisplayRa(''); // Clear formatted display
        setNome(''); 
        setSenha('');
        setAlunoOriginal(null);
        setHouveMudancas(false);
        setErroBusca('');
    };

    /**
     * Abre/fecha o modal principal e limpa formulário ao fechar
     */
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) {
            limparFormulario();
        }
    };

    /**
     * Monitora mudanças dos campos e ativa o botão Salvar apenas se houver alterações.
     */
    useEffect(() => {
        if (!alunoOriginal) {
            setHouveMudancas(false);
            return;
        }
        const nomeMudou = nome !== alunoOriginal.nome_aluno;
        const turmaMudou = turma !== alunoOriginal.turma;
        const senhaMudou = senha !== '';
        setHouveMudancas(nomeMudou || turmaMudou || senhaMudou);
    }, [nome, turma, senha, alunoOriginal]);

    const formatRaDisplay = (value) => {
        // Remove all non-digit characters
        const cleanedValue = value.replace(/\D/g, '');
        
        // Format as RA (e.g., 123456789 -> 123.456.789)
        if (cleanedValue.length <= 3) {
            return cleanedValue;
        } else if (cleanedValue.length <= 6) {
            return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
        } else {
            return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}`;
        }
    };

    /**
     * Busca aluno pelo RA usando o backend.
     */
    const handleBuscar = async () => {
        if (!ra) {
            setErroBusca("Por favor, digite o R.A para buscar.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setErroBusca("Erro de autenticação. Faça o login novamente.");
            return;
        }
        setIsLoading(true);
        setErroBusca('');
        try {
            const filtro = { RA_aluno: ra };
            const response = await fetch(`${backendUrl}/coordenador/alunos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(filtro),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setErroBusca(errorData.mensagem || "Erro ao buscar aluno.");
                return;
            }
            const alunos = await response.json();
            if (alunos.length === 0) {
                setErroBusca("Nenhum aluno encontrado com este R.A.");
                return;
            }
            carregarDadosAluno(alunos[0]);
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            setErroBusca("Erro de comunicação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Envia as alterações para o backend via PATCH.
     */
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
        setErroBusca('');
        const dadosParaEnviar = {
            RA_aluno: alunoOriginal.RA_aluno, // Using the raw numbers
            nome_aluno: nome,
            turma: turma,
        };
        if (senha) {
            dadosParaEnviar.senha_aluno = senha;
        }
        try {
            const response = await fetch(`${backendUrl}/coordenador/aluno`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(dadosParaEnviar)
            });
            if (response.ok) {
                setIsModalOpen(false);
                setIsConfirmationOpen(true);
            } else {
                const erro = await response.json().catch(() => ({}));
                alert(`Erro ao salvar: ${erro.mensagem || "Falha ao atualizar o aluno."}`);
            }
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert(`Erro ao salvar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Fecha o modal de confirmação e executa o callback de atualização do componente pai.
     */
    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        limparFormulario();
        if (onUpdate) {
            onUpdate();
        }
    };

    /**
     * Carrega os dados do aluno nos campos do formulário.
     */
    const carregarDadosAluno = (aluno) => {
        if (aluno) {
            setErroBusca('');
            setAlunoOriginal({
                nome_aluno: aluno.nome_aluno || '',
                turma: aluno.turma || '',
                RA_aluno: aluno.RA_aluno || ''
            });
            setNome(aluno.nome_aluno || '');
            setRa(aluno.RA_aluno || '');
            setDisplayRa(formatRaDisplay(aluno.RA_aluno || '')); // Format for display
            setTurma(aluno.turma || '');
            setSenha('');
        }
    };

    /**
     * Permite apenas letras e acentuação no nome.
     */
    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\sà-üÀ-Ü]/g, '');
    };

    /**
     * Atualiza campos do formulário e limpa erro de busca ao digitar.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'RA':
                // Apenas números no campo RA
                const onlyNums = value.replace(/[^\d]/g, '');
                setRa(onlyNums);
                // Update formatted display
                setDisplayRa(formatRaDisplay(value));
                if (erroBusca) setErroBusca('');
                break;
            case 'name':
                setNome(formatName(value));
                break;
            case 'senha':
                setSenha(value);
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
            {/* Card de ação */}
            <div className="card-container">
                {cardData.map((card, index) => (
                    <div key={index} className="card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-500" onClick={toggleModal}>
                        <div className="card-icon flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl mb-4">{card.icon}</div>
                        <h3 className="card-title text-lg font-semibold text-gray-800 mb-2">{card.titulo}</h3>
                        <p className="card-description text-gray-600">{card.descricao}</p>
                    </div>
                ))}
            </div>

            {/* Modal de edição */}
            {isModalOpen && (
                <div id="edit-modal" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm overflow-y-auto p-4">
                    <div className="relative w-full max-w-md bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900">Editar Aluno</h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={toggleModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* RA */}
                                <div className="col-span-2">
                                    <label htmlFor="RA" className="block mb-2 text-sm font-medium text-gray-900">Registro do Aluno (R.A)</label>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            type="text" 
                                            name="RA" 
                                            id="RA" 
                                            maxLength={11} // Allowing space for dots in display
                                            value={displayRa} // Using formatted display value
                                            onChange={handleChange}
                                            disabled={alunoOriginal !== null}
                                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed ${erroBusca ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                                            placeholder="Ex: 123.456.789"
                                            required
                                        />
                                        <button
                                            type="button" 
                                            onClick={handleBuscar} 
                                            disabled={isLoading || alunoOriginal !== null}
                                            className='bg-blue-950 rounded-lg text-white hover:bg-blue-800 transition-all p-2 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
                                        >
                                            {isLoading ? '...' : 'Buscar'}
                                        </button>
                                    </div>
                                    {erroBusca && (
                                        <p className="mt-2 text-sm text-red-600">{erroBusca}</p>
                                    )}
                                </div>
                                {/* Nome */}
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome Completo</label>
                                    <input
                                        type="text" name="name" id="name" maxLength={40} value={nome}
                                        onChange={handleChange}
                                        disabled={alunoOriginal === null}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" required
                                    />
                                </div>
                                {/* Senha */}
                                <div className="col-span-2">
                                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Nova Senha (opcional)</label>
                                    <input
                                        type="password" name="senha" id="senha" maxLength={40} value={senha}
                                        onChange={handleChange}
                                        disabled={alunoOriginal === null}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                        placeholder="Deixe em branco para não alterar"
                                    />
                                </div>
                                {/* Turma */}
                                <div className="col-span-2">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                                    <input
                                        type="text" id="turma" name="turma" maxLength={5} value={turma}
                                        onChange={handleChange}
                                        disabled={alunoOriginal === null}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" required
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading || !houveMudancas}
                                className="w-full text-white inline-flex items-center justify-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                {isLoading ? 'Salvando...' : 'Salvar alterações'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Modal de confirmação */}
            {isConfirmationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-lg shadow p-6 max-w-sm w-full text-center">
                        <svg className="mx-auto mb-4 w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Dados do aluno atualizados com sucesso!</h3>
                        <button
                            onClick={closeConfirmation}
                            className="w-full mt-4 px-4 py-2 bg-[#1f557b] hover:bg-[#0e3754] text-white rounded-lg cursor-pointer transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}