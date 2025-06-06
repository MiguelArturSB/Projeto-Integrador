'use client'

import { useState, useEffect } from 'react';

export default function CardUpdate() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [turma, setTurma] = useState('');
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    const [frequencia, setFrequencia] = useState('');
    const [senha, setSenha] = useState('');
    
    const cardData = [
        {
            icon: '%',
            titulo: 'Editar aluno',
            descricao: 'Clique para editar os dados de um aluno'
        }
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        if (!isModalOpen) {
            setTurma('');
            setRa('');
            setNome('');
            setFrequencia('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        setIsConfirmationOpen(true);
        
        console.log('Dados atualizados do aluno:', { 
            nome, 
            ra, 
            turma,
            frequencia 
        });
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
    };

    const carregarDadosAluno = (aluno) => {
        if (aluno) {
            setNome(aluno.nome);
            setRa(aluno.ra);
            setTurma(aluno.turma);
            setFrequencia(aluno.frequencia);
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
                id="edit-modal" 
                tabIndex="-1" 
                aria-hidden={!isModalOpen} 
                className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50 overflow-y-auto overflow-x-hidden`}
            >
                <div className="relative w-full max-w-md p-4 max-h-full">
                    <div className="w-96 relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Editar Aluno
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
                                    <label htmlFor="RA" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registro do Aluno (R.A)</label>
                                    <div className='flex justify-center gap-3'>
                                    <input 
                                        type="text" 
                                        name="RA" 
                                        id="RA" 
                                        value={ra}
                                        onChange={(e) => setRa(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Número do R.A" 
                                        required 
                                    />
                                    <button className='bg-blue-950 rounded-lg text-white hover:text-gray-500 transition-all p-2 cursor-pointer'>Buscar</button>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Digite o nome do aluno" 
                                        required 
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input 
                                        type="text" 
                                        name="senha" 
                                        id="senha" 
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="*********" 
                                        required 
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="frequencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequência</label>
                                    <input 
                                        type="number" 
                                        name="frequencia" 
                                        id="frequencia" 
                                        value={frequencia}
                                        onChange={(e) => setFrequencia(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Frequência do aluno" 
                                        required 
                                    />

                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="turma" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turma</label>
                                    <select 
                                        id="turma" 
                                        value={turma}
                                        onChange={(e) => setTurma(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        <option value="2MD">2MD</option>
                                        <option value="2TD">2TD</option>
                                        <option value="2ND">2ND</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Edite as informações do aluno conforme necessário.
                                </p>
                            </div>
                            <button 
                                type="submit" 
                                className="text-white inline-flex items-center bg-[#1f557b] cursor-pointer hover:bg-[#0e3754]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                Salvar alterações
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
                                Dados do aluno atualizados com sucesso!
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