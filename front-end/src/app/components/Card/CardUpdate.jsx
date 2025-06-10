'use client'
import { useState, useEffect } from 'react';

export default function CardUpdateAluno({ onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erroBusca, setErroBusca] = useState('');

    const [turma, setTurma] = useState('');
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const [alunoOriginal, setAlunoOriginal] = useState(null);
    const [houveMudancas, setHouveMudancas] = useState(false);

    const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;

    const cardData = [
        { icon: '%', titulo: 'Editar aluno', descricao: 'Clique para editar os dados de um aluno' }
    ];

    const limparFormulario = () => {
        setTurma(''); setRa(''); setNome(''); setSenha('');
        setAlunoOriginal(null);
        setHouveMudancas(false);
        setErroBusca('');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) {
            limparFormulario();
        }
    };

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

    const handleBuscar = async () => {
        if (!ra) {
            setErroBusca("Por favor, digite o R.A para buscar.");
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
            const filtro = { RA_aluno: ra };
            const response = await fetch(`${backendUrl}/coordenador/alunos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(filtro),
            });
            if (!response.ok) throw new Error("Erro na comunicação com o servidor.");
            const alunos = await response.json();
            if (alunos.length === 0) throw new Error("Nenhum aluno encontrado com este R.A.");
            carregarDadosAluno(alunos[0]);
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            setErroBusca(error.message);
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
        const dadosParaEnviar = {
            RA_aluno: alunoOriginal.RA_aluno,
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
            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.mensagem || "Falha ao atualizar o aluno.");
            }
            setIsModalOpen(false);
            setIsConfirmationOpen(true);
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
            setTurma(aluno.turma || '');
            setSenha('');
        }
    };

    // --- NOVAS FUNÇÕES DE FORMATAÇÃO E NOVO HANDLECHANGE ---

    // Formata o nome para aceitar apenas letras e espaços
    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\sà-üÀ-Ü]/g, '');
    };

    // Um único handleChange para todos os campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'RA':
                if (erroBusca) setErroBusca('');
                setRa(value);
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
                                <div className="col-span-2">
                                    <label htmlFor="RA" className="block mb-2 text-sm font-medium text-gray-900">Registro do Aluno (R.A)</label>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            type="text" name="RA" id="RA" maxLength={9} value={ra}
                                            onChange={handleChange} // Usa o novo handler
                                            disabled={alunoOriginal !== null}
                                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed ${erroBusca ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                                            placeholder="Digite o R.A para buscar" required
                                        />
                                        <button
                                            type="button" onClick={handleBuscar} disabled={isLoading || alunoOriginal !== null}
                                            className='bg-blue-950 rounded-lg text-white hover:bg-blue-800 transition-all p-2 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
                                        >
                                            {isLoading ? '...' : 'Buscar'}
                                        </button>
                                    </div>
                                    {erroBusca && (
                                        <p className="mt-2 text-sm text-red-600">{erroBusca}</p>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome Completo</label>
                                    <input
                                        type="text" name="name" id="name" maxLength={40} value={nome}
                                        onChange={handleChange} // Usa o novo handler
                                        disabled={alunoOriginal === null}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed" required
                                    />
                                </div>
                                
                                <div className="col-span-2">
                                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Nova Senha (opcional)</label>
                                    <input
                                        type="password" name="senha" id="senha" maxLength={40} value={senha}
                                        onChange={handleChange} // Usa o novo handler
                                        disabled={alunoOriginal === null}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                        placeholder="Deixe em branco para não alterar"
                                    />
                                </div>
                                
                                <div className="col-span-2">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                                    <input
                                        type="text" id="turma" name="turma" maxLength={5} value={turma}
                                        onChange={handleChange} // Usa o novo handler
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