'use client'

import './headerCoordenador.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * HeaderCoordenador
 * 
 * Header do portal do coordenador, com animação de logout e modal de confirmação.
 */
export default function HeaderCoordenador() {
    const [animado, setAnimado] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    // Dispara animação de saída
    const animacao = () => {
        setAnimado(true);
    };

    // Abre/fecha modal de logout
    const toggleLogoutModal = () => {
        setShowLogoutModal(!showLogoutModal);
    };

    // Logout com animação + redirecionamento
    const handleLogout = () => {
        animacao();
        toggleLogoutModal();
        setTimeout(() => {
            router.push('/?sucesso=ok');
        }, 1950);
    };

    return (
        <>
            {/* Animação de saída */}
            {animado && (
                <div className="slide-in-left bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
                    <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
                        <p className="text-black font-bold">Saindo <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b></p>
                    </div>
                </div>
            )}
            <div className='bg-amber-400'>
                <header className="bg-[#054068]">
                    <div className='flex flex-col items-center justify-center text-4xl shadow-xl/30 shadow-blue-900 relative py-4'>
                        <div className='absolute top-4 left-3.5 cursor-pointer'>
                            <img
                                src="./logout.svg"
                                width={40}
                                alt="sair do perfil"
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={toggleLogoutModal}
                            />
                        </div>
                        <img src='./logo2.png' width={200} className='mt-2' alt="Logo" />
                        <h1 className='text-white font-bold text-shadow-2xs text-shadow-black text-center mt-2'>
                            Seja Bem-vindo ao Portal de frequência do Coordenador!
                        </h1>
                        <h4 className='text-blue-50 text-[20px] mt-2 mb-2 text-center font-bold'>
                            Gerencie alunos e professores de maneira rápida e prática!
                        </h4>
                    </div>
                </header>

                {/* Modal de confirmação de logout */}
                {showLogoutModal && (
                    <div
                        id="logout-modal"
                        tabIndex="-1"
                        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm overflow-y-auto"
                    >
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm">
                                <button
                                    type="button"
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                    onClick={toggleLogoutModal}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Fechar</span>
                                </button>

                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-700">
                                        Tem certeza que deseja sair do seu perfil?
                                    </h3>
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        className="text-white bg-[#17577c] hover:bg-[#054068] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
                                    >
                                        Sim, sair
                                    </button>
                                    <button
                                        onClick={toggleLogoutModal}
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    >
                                        Não, cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}