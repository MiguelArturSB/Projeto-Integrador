'use client'

import { useState } from 'react';

/**
 * Formata o R.A para exibição no padrão 000.000.000
 */
const formatRa = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    const truncatedValue = onlyNums.slice(0, 9);
    return truncatedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
};

/**
 * CardRemover - Componente para remoção de alunos.
 *
 * - Permite buscar aluno por RA, exibe nome e turma antes de permitir remoção.
 * - Chama o callback onUpdate ao remover com sucesso.
 */
export default function CardRemover({ onUpdate }) {
    // Estado do modal e de confirmação
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Estados do formulário
    const [turma, setTurma] = useState('');
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');

    // Controle de UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const backendUrl = `http://localhost:3001`;

    // Dados do card
    const cardData = [
        {
            icon: '-',
            titulo: 'Remover aluno',
            descricao: 'Clique para remover um aluno do sistema'
        }
    ];

    /**
     * Abre/fecha o modal e limpa campos/erros.
     */
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setError('');
            setTurma('');
            setRa('');
            setNome('');
            setIsLoading(false);
        }
    };

    /**
     * Formata o RA enquanto digita.
     */
    const handleRaChange = (e) => {
        const formattedRa = formatRa(e.target.value);
        setRa(formattedRa);
    };

    /**
     * Busca o aluno no backend usando o RA.
     */
    const handleBuscarAluno = async () => {
        setError('');
        setNome('');
        setTurma('');

        if (!ra) {
            setError('Por favor, digite um RA para buscar.');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Erro de autenticação. Faça o login novamente.");
            console.error("[handleBuscarAluno] Falha na autenticação: token é nulo ou não existe.");
            return;
        }

        setIsLoading(true);

        try {
            const raLimpo = ra.replace(/\D/g, '');
            const filtro = { RA_aluno: raLimpo };

            const res = await fetch(`${backendUrl}/coordenador/alunos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(filtro)
            });

            if (!res.ok) {
                const errorBody = await res.json().catch(() => ({}));
                setError(errorBody.mensagem || 'Erro ao buscar aluno.');
                return;
            }

            const alunos = await res.json();

            if (!alunos || alunos.length === 0) {
                setError('Nenhum aluno encontrado com este RA.');
                return;
            }

            const alunoEncontrado = alunos[0];
            setNome(alunoEncontrado.nome_aluno || '');
            setTurma(alunoEncontrado.turma || '');

        } catch (err) {
            setError('Erro de comunicação. Tente novamente.');
            console.error("[FALHA GERAL - BUSCA]", { errorObject: err, RA_enviado: ra });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Submete o formulário para remoção do aluno.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!ra) {
            setError('RA não preenchido');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Erro de autenticação. Faça o login novamente.");
            return;
        }

        setIsLoading(true);

        try {
            const raLimpo = ra.replace(/\D/g, '');
            const res = await fetch(`${backendUrl}/coordenador/aluno`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ RA_aluno: raLimpo })
            });

            if (!res.ok) {
                const errorBody = await res.json().catch(() => ({}));
                setError(errorBody.mensagem || 'Erro ao remover aluno.');
            } else {
                setIsModalOpen(false);
                setIsConfirmationOpen(true);
            }
        } catch (err) {
            setError('Erro de comunicação ao tentar remover.');
            console.error("[FALHA GERAL - REMOÇÃO]", { errorObject: err, RA_enviado: ra });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Fecha modal de confirmação e executa callback para atualização.
     */
    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        if (onUpdate) {
            onUpdate();
        }
    };

    return (
        <>
            {/* Card de ação para abrir modal */}
            <div className="card-container">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-500"
                        onClick={toggleModal}
                    >
                        <div className="card-icon flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl mb-4">
                            {card.icon}
                        </div>
                        <h3 className="card-title text-lg font-semibold text-gray-800 mb-2">
                            {card.titulo}
                        </h3>
                        <p className="card-description text-gray-600">
                            {card.descricao}
                        </p>
                    </div>
                ))}
            </div>

            {/* Modal - Remover aluno */}
            <div
                id="remove-modal"
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden p-4`}
            >
                <div className="relative w-full max-w-md bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Remover Aluno
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                            onClick={toggleModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Fechar modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="ra" className="block mb-2 text-sm font-medium text-gray-900">Insira o R.A do aluno</label>
                                <div className='flex justify-center gap-3'>
                                    <input
                                        type="text"
                                        name="ra"
                                        id="ra"
                                        value={ra}
                                        onChange={handleRaChange}
                                        maxLength={11} // 9 dígitos + 2 pontos
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="000.000.000"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='bg-blue-950 rounded-lg text-white hover:bg-blue-800 transition-all p-2 px-4 cursor-pointer disabled:bg-gray-400'
                                        onClick={handleBuscarAluno}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Buscando...' : 'Buscar'}
                                    </button>
                                </div>
                                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome do aluno</label>
                                <div className={`bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5 min-h-[42px] flex items-center ${nome ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {nome || '-'}
                                </div>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                                <div className={`bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5 min-h-[42px] flex items-center ${turma ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {turma || '-'}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Confirme as informações do aluno antes de remover. Esta ação não pode ser desfeita.
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-red-600 cursor-pointer hover:bg-red-800 transition-all focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
                            disabled={!nome || !turma || !ra || isLoading}
                        >
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            {isLoading ? 'Removendo...' : 'Confirmar remoção'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal de confirmação */}
            {isConfirmationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-lg shadow p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sucesso!</h3>
                        <div className="flex items-center mb-4">
                            <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-gray-700">Aluno removido com sucesso!</p>
                        </div>
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