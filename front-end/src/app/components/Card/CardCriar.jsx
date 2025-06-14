'use client'

import { useState, useEffect } from 'react';

/**
 * Componente Card para cadastrar novo aluno.
 * Mostra um card com botão para abrir modal.
 * Modal contém formulário de cadastro com validação de RA, nome, senha e turma.
 * Exibe mensagem de confirmação ao cadastrar com sucesso.
 */
export default function Card({ onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle de exibição do modal de cadastro
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Controle de exibição do modal de sucesso
    const [raError, setRaError] = useState(''); // Estado do erro do RA
    const [carregando, setCarregando] = useState(true); // Estado de carregamento inicial
    const [formData, setFormData] = useState({
        name: '',
        senha: '',
        RA: '',
        turma: ''
    });

    const backendUrl = `http://localhost:3001`;

    // Dados do card de cadastro
    const cardData = [
        {
            icon: '+',
            titulo: 'Cadastrar novo aluno',
            descricao: 'Clique para adicionar um novo aluno'
        }
    ];

    /**
     * Abre/fecha o modal e limpa o formulário e erro do RA.
     */
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setRaError('');
        setFormData({ name: '', senha: '', RA: '', turma: '' });
    };

    /**
     * Formata o RA no padrão 123.456.789
     */
    const formatRA = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const truncatedValue = numericValue.slice(0, 9);
        return truncatedValue.replace(/(\d{3})(?=\d)/g, '$1.');
    };

    /**
     * Permite apenas letras e espaços no nome.
     */
    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\sà-üÀ-Ü]/g, '');
    };

    /**
     * Atualiza os campos do formulário e aplica formatação/validação.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limpa erro de RA ao editar
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

    /**
     * Efeito inicial: checa token e zera carregamento.
     */
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            console.error("Sessão expirada ou inválida. Por favor, faça login novamente.");
        }
        setCarregando(false);
        window.scrollTo(0, 0);
    }, []);

    /**
     * Envia os dados do formulário ao backend.
     * Trata erros e mostra modal de confirmação em caso de sucesso.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token não encontrado. Faça login novamente.");
            return;
        }

        // Remove pontos do RA
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
                // Mostra mensagem específica para RA duplicado
                if (response.status === 409) {
                    setRaError(errorData.message || "Este R.A. já está em uso.");
                } else {
                    const errorMessage = errorData.message || 'Ocorreu um problema no servidor. Tente novamente.';
                    alert(`Erro: ${errorMessage}`);
                }
                return;
            }

            // Sucesso no cadastro
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

    /**
     * Fecha modal de confirmação e executa callback para atualizar lista de alunos.
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

            {/* Modal de cadastro */}
            <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden`}
            >
                <div className="relative w-full max-w-md p-4 max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Cadastrar Novo Aluno
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                                {/* Campo Nome */}
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        maxLength={40}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Digite o nome do aluno"
                                        required
                                    />
                                </div>
                                {/* Campo Senha */}
                                <div className="col-span-2">
                                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        id="senha"
                                        value={formData.senha}
                                        maxLength={40}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Digite a senha do aluno"
                                        required
                                    />
                                </div>
                                {/* Campo RA */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="RA" className="block mb-2 text-sm font-medium text-gray-900">Registro do Aluno (R.A)</label>
                                    <input
                                        type="text"
                                        name="RA"
                                        id="RA"
                                        value={formData.RA}
                                        onChange={handleChange}
                                        maxLength={11}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                                        ${raError
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-primary-600 focus:border-primary-600'
                                            }`}
                                        placeholder="123.456.789"
                                        required
                                    />
                                    {raError && (
                                        <p className="mt-2 text-sm text-red-600">{raError}</p>
                                    )}
                                </div>
                                {/* Campo Turma */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
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
                            <button type="submit" className="text-white inline-flex items-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Cadastrar aluno
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal de confirmação */}
            {isConfirmationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
                    <div className="relative bg-white rounded-lg shadow p-6 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Sucesso!
                            </h3>
                        </div>
                        <div className="flex items-center mb-4">
                            <svg className="w-8 h-8 text-blue-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-gray-700">
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