'use client'

import { useState } from 'react'

export default function CardProf() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        cpf: '',
        disciplina: '',
        turma: ''
    });
    
    const cardData = [
        {
            icon: '+',
            titulo: 'Cadastrar novo professor',
            descricao: 'Clique para adicionar um novo professor'
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        if (!isModalOpen) {
            setFormData({
                nome: '',
                senha: '',
                cpf: '',
                disciplina: '',
                turma: ''
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Dados do professor:', formData);
        
        setIsModalOpen(false);
        setIsConfirmationOpen(true);
        

        setFormData({
            nome: '',
            senha: '',
            cpf: '',
            disciplina: '',
            turma: ''
        });
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
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
                id="professor-modal" 
                tabIndex="-1" 
                aria-hidden={!isModalOpen} 
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden`}
            >
                <div className="relative w-full max-w-md p-4 max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Cadastrar Novo Professor
                            </h3>
                            <button 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" 
                                onClick={toggleModal}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Fechar modal</span>
                            </button>
                        </div>
                        
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input 
                                        type="text" 
                                        name="nome" 
                                        id="nome" 
                                        value={formData.nome}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Digite o nome do professor" 
                                        required 
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input 
                                        type="text" 
                                        name="senha" 
                                        id="senha" 
                                        value={formData.senha}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Digite a senha do professor" 
                                        required 
                                    />
                                </div>
                                
                                <div className="col-span-2">
                                    <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                                    <input 
                                        type="text" 
                                        name="cpf" 
                                        id="cpf" 
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Digite o CPF do professor" 
                                        required 
                                    />
                                </div>
                            
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="disciplina" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disciplina</label>
                                    <select 
                                        name="disciplina"
                                        value={formData.disciplina}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="" disabled>Selecione a disciplina lecionada</option>
                                        <option value="LER">LER</option>
                                        <option value="ARI">ARI</option>
                                        <option value="LOPAL">LOPAL</option>
                                        <option value="PBE">PBE</option>
                                        <option value="SOP">SOP</option>
                                    </select>
                                </div>
                                
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turma</label>
                                    <select 
                                        name="turma"
                                        value={formData.turma}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="" disabled>Selecione a turma</option>
                                        <option value="2MD">2MD</option>
                                        <option value="2TD">2TD</option>
                                        <option value="2ND">2ND</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="text-white inline-flex items-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Cadastrar Professor
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
                                Professor cadastrado com sucesso!
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