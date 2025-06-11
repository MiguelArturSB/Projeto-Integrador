'use client'

import { useState } from 'react';

// --- PASSO 1: Criar uma função helper para formatar o CPF ---
// Colocamos fora do componente para não ser recriada a cada renderização.
const formatCpf = (value) => {
    // 1. Remove tudo que não for dígito
    const onlyNums = value.replace(/[^\d]/g, '');

    // 2. Limita a 11 dígitos
    const truncatedValue = onlyNums.slice(0, 11);

    // 3. Aplica a máscara
    return truncatedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};


export default function CardProf() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [turma, setTurma] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    const backendUrl = `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:3001`;

    const cardData = [
        {
            icon: '-',
            titulo: 'Remover professor',
            descricao: 'Clique para remover um professor do sistema'
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        if (!isModalOpen) {
            setCpf('');
            setNome('');
            setDisciplina('');
            setTurma('');
            setSearchError('');
            setIsLoading(false);
        }
    };

    // --- PASSO 2: Criar um handler para o input de CPF que usa a formatação ---
    const handleCpfChange = (e) => {
        const formattedCpf = formatCpf(e.target.value);
        setCpf(formattedCpf);
    };

    const handleSearch = async () => {
        if (!cpf) {
            setSearchError('Por favor, digite um CPF para buscar.');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setSearchError("Erro de autenticação. Faça o login novamente.");
            return;
        }
        
        setIsLoading(true);
        setSearchError('');
        setNome('');
        setDisciplina('');
        setTurma('');

        try {
            // A lógica de limpeza continua a mesma e funciona perfeitamente!
            const cpfLimpo = cpf.replace(/\D/g, '');
            const filtro = { cpf_professor: cpfLimpo };

            const response = await fetch(`${backendUrl}/coordenador/professores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(filtro),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erro ${response.status}: Falha na comunicação.`);
            }

            const professores = await response.json();
            
            if (!professores || professores.length === 0) {
                setSearchError("Nenhum professor encontrado com este CPF.");
                return; 
            }

            const professorEncontrado = professores[0];
            
            setNome(professorEncontrado.nome_professor);
            setDisciplina(professorEncontrado.materia);
            setTurma(professorEncontrado.turma_professor);

        } catch (error) {
            console.error("ERRO INESPERADO AO BUSCAR PROFESSOR:", error);
            setSearchError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // A lógica de limpeza continua a mesma e funciona perfeitamente!
        const cpfLimpo = cpf.replace(/\D/g, '');
        const token = localStorage.getItem("token");
        if (!token) {
            setSearchError("Sessão expirada. Faça o login novamente.");
            return;
        }

        setIsLoading(true);
        setSearchError('');

        try {
            const response = await fetch(`${backendUrl}/coordenador/professor`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cpf_professor: cpfLimpo })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ mensagem: "Erro ao tentar remover." }));
                throw new Error(errorData.mensagem);
            }

            const result = await response.json();
            console.log("Resposta do backend (exclusão):", result.mensagem);

            setIsModalOpen(false);
            setIsConfirmationOpen(true);

        } catch (error) {
            console.error("Erro ao remover professor:", error);
            setSearchError(error.message); 
        } finally {
            setIsLoading(false); 
        }
    };
    
    const closeConfirmation = () => setIsConfirmationOpen(false);

    return (
        <>
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

            <div
                id="remove-modal-prof"
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden p-4`}
            >
                <div className="relative w-full max-w-md bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Remover Professor
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
                                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900">CPF</label>
                                <div className='flex justify-center gap-3'>
                                    {/* --- PASSO 3: Atualizar o input --- */}
                                    <input
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        value={cpf}
                                        onChange={handleCpfChange} // Usar a nova função de change
                                        maxLength={14} // Limitar o campo a 14 caracteres (11 dígitos + 2 pontos + 1 traço)
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="000.000.000-00"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        disabled={isLoading}
                                        className='bg-blue-950 rounded-lg text-white hover:bg-blue-800 transition-all p-2 px-4 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
                                    >
                                        {isLoading ? 'Buscando...' : 'Buscar'}
                                    </button>
                                </div>
                                {searchError && <p className="text-red-600 text-sm mt-2">{searchError}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                <div className={`bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5 min-h-[42px] flex items-center ${nome ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {nome || 'Aguardando busca...'}
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="disciplina" className="block mb-2 text-sm font-medium text-gray-900">Disciplina</label>
                                <div className={`bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5 min-h-[42px] flex items-center ${disciplina ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {disciplina || '-'}
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                                <div className={`bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5 min-h-[42px] flex items-center ${turma ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {turma || '-'}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Confirme as informações do professor antes de remover. Esta ação não pode ser desfeita.
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={!nome || isLoading}
                            className="text-white inline-flex items-center bg-red-600 cursor-pointer hover:bg-red-800 transition-all focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            {isLoading ? 'Removendo...' : 'Confirmar remoção'}
                        </button>
                    </form>
                </div>
            </div>

            {isConfirmationOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4">
                 <div className="relative bg-white rounded-lg shadow p-6 max-w-sm w-full">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Sucesso!</h3>
                     <div className="flex items-center mb-4">
                         <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                         </svg>
                         <p className="text-gray-700">Professor removido com sucesso!</p>
                     </div>
                     <button onClick={closeConfirmation} className="w-full mt-4 px-4 py-2 bg-[#1f557b] hover:bg-[#0e3754] text-white rounded-lg cursor-pointer transition-colors">OK</button>
                 </div>
             </div>
            )}
        </>
    );
}