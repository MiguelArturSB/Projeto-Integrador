'use client'

import { useState } from 'react';

export default function Card() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [turma, setTurma] = useState('');
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    
    const cardData = [
        {
            icon: '-',
            titulo: 'Remover aluno',
            descricao: 'Clique para remover um aluno do sistema'
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        setIsConfirmationOpen(true);
        setTurma('');
        setRa('');
        setNome('');
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
                id="remove-modal" 
                tabIndex="-1" 
                aria-hidden={!isModalOpen} 
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden`}
            >
                <div className="relative w-full max-w-md p-4 max-h-full">
                    <div className="w-96 relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Remover Aluno
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
                                <div className="col-span-2 ">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insira o R.A do aluno</label>
                                    <div className='flex justify-center gap-3'>
                                    <input 
                                        type="text" 
                                        name="ra" 
                                        id="ra" 
                                        value={ra}
                                        onChange={(e) => setRa(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="000.000.000" 
                                        required 
                                    />
                                    <button 
                                        type="button" 
                                        className='bg-blue-950 rounded-lg text-white hover:text-gray-500 transition-all p-2 cursor-pointer'
                                    >
                                        Buscar
                                    </button>
                                    </div>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome do aluno</label>
                                    <h1 className='bg-gray-50 text-gray-400 text-sm rounded-lg w-full p-2.5'>Fulano da silva</h1>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turma</label>
                                    <input 
                                    type="text" 
                                    name="turma" 
                                    id="turma" 
                                    value={turma}
                                    readOnly
                                    className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none" 
                                    placeholder="2MD" 
                                    required 
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Confirme as informações do aluno antes de remover. Esta ação não pode ser desfeita.
                                </p>
                            </div>
                            <button 
                                type="submit" 
                                className="text-white inline-flex items-center bg-cyan-900 cursor-pointer hover:bg-red-700 transition-all focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                Confirmar remoção
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
                                Aluno removido com sucesso!
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