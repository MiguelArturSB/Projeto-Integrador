'use client'

import { useState, useEffect } from 'react';

export default function Card({ onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [raError, setRaError] = useState(''); // Estado específico para o erro do RA
    const [carregando, setCarregando] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        senha: '',
        RA: '',
        turma: ''
    });

    const backendUrl = `http://localhost:3001`;

    const cardData = [
        {
            icon: '+',
            titulo: 'Cadastrar novo aluno',
            descricao: 'Clique para adicionar um novo aluno'
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // Limpa o erro e o formulário ao abrir/fechar o modal
        setRaError('');
        setFormData({ name: '', senha: '', RA: '', turma: '' });
    };

    const formatRA = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const truncatedValue = numericValue.slice(0, 9);
        return truncatedValue.replace(/(\d{3})(?=\d)/g, '$1.');
    };

    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\sà-üÀ-Ü]/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limpa o erro específico do RA assim que o usuário começar a corrigi-lo
        if (name === 'RA') {
            if (raError) setRaError('');
            const formattedRA = formatRA(value);
            setFormData(prev => ({ ...prev, [name]: formattedRA }));
        } else if (name === 'name') {
            const formattedName = formatName(value);
            setFormData(prev => ({ ...prev, [name]: formattedName }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            console.error("Sessão expirada ou inválida. Por favor, faça login novamente.");
        }
        setCarregando(false);
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token não encontrado. Faça login novamente.");
            return;
        }

        const raNumerico = formData.RA.replace(/\./g, '');

        const dadosFormatados = {
            nome_aluno: formData.name,
            RA_aluno: raNumerico,
            senha_aluno: formData.senha,
            turma: formData.turma
        };

        try {
            const response = await fetch(`${backendUrl}/coordenador/aluno`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dadosFormatados),
            });

            if (!response.ok) {
                let errorData = {}; 
                try {

                    errorData = await response.json();
                } catch (jsonError) {
                    console.warn("Não foi possível analisar o JSON da resposta de erro.", jsonError);

                }
    
                console.log("Erro recebido do backend:", errorData); 
    
                if (response.status === 409) {
                    // Usa a mensagem do backend, se existir, ou uma mensagem padrão.
                    setRaError(errorData.message || "Este R.A. já está em uso.");
                } else {
                    const errorMessage = errorData.message || 'Ocorreu um problema no servidor. Tente novamente.';
                    alert(`Erro: ${errorMessage}`);
                }
                return;
            }

            // Sucesso
            const data = await response.json();
            console.log("Aluno cadastrado com sucesso:", data);

            setIsModalOpen(false);
            setIsConfirmationOpen(true);

            setFormData({ name: '', senha: '', RA: '', turma: '' });

        } catch (error) {
            console.error("Erro na requisição ao cadastrar aluno:", error);
            alert("Não foi possível conectar ao servidor. Verifique sua conexão.");
        }
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        if (onUpdate) {
            onUpdate();
        }
    };

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
                id="crud-modal"
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden`}
            >
                <div className="relative w-full max-w-md p-4 max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Cadastrar Novo Aluno
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
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
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        maxLength={40}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digite o nome do aluno"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        id="senha"
                                        value={formData.senha}
                                        maxLength={40}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digite a senha do aluno"
                                        required
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="RA" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registro do Aluno (R.A)</label>
                                    <input
                                        type="text"
                                        name="RA"
                                        id="RA"
                                        value={formData.RA}
                                        onChange={handleChange}
                                        maxLength={11}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white
                                        ${raError
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
                                                : 'border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:border-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                            }`}
                                        placeholder="123.456.789"
                                        required
                                    />
                                    {raError && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{raError}</p>
                                    )}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turma</label>
                                    <input
                                        type="text"
                                        name="turma"
                                        id="turma"
                                        value={formData.turma}
                                        maxLength={5}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Ex: 2MD"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Cadastrar aluno
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {isConfirmationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Sucesso!
                            </h3>
                        </div>
                        <div className="flex items-center mb-4">
                            <svg className="w-8 h-8 text-blue-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-gray-700 dark:text-gray-300">
                                Aluno cadastrado com sucesso!
                            </p>
                        </div>
                        <button
                            onClick={closeConfirmation}
                            className="w-full mt-4 px-4 py-2 bg-[#1f557b] hover:bg-[#0e3754] text-white rounded-lg cursor-pointer"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}