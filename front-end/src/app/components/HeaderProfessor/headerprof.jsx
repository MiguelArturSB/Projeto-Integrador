'use client'

import './headerprof.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function HomeAluno() {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    const toggleProfileModal = () => {
        setShowProfileModal(!showProfileModal);
    };

    const toggleLogoutModal = () => {
        setShowLogoutModal(!showLogoutModal);
    };

    const handleLogout = () => {
        console.log("Usuário deslogado");
        toggleLogoutModal(); 
        router.push('/'); 
    };

    return (
        <>
            <header className="bg-[#054068] z-40 relative">
                <div className='flex flex-col items-center justify-center  text-4xl shadow-xl/30 shadow-blue-900 relative py-4'>
                   
                    <div className='absolute top-4 right-4 cursor-pointer'>
                        <img 
                            src="./usericon.svg" 
                            width={50} 
                            alt="Acessar perfil" 
                            className="cursor-pointer hover:opacity-80 transition-opacity" 
                            onClick={toggleProfileModal}
                        />
                    </div>
                    
                  
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
                        Seja Bem-vindo ao Portal de frequência do Professor!
                    </h1>
                    <h4 className='text-blue-50 text-[20px] mt-2 mb-2 text-center font-bold'>
                        Atualize faltas e presenças diariamente!
                    </h4>
                </div>
            </header>

          
            {showProfileModal && (
                <div 
                    id="profile-modal" 
                    tabIndex="-1" 
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm overflow-y-auto"
                >
                    <div className="relative w-full max-w-md mx-auto my-auto">
                        <div className="relative bg-white rounded-lg shadow-sm">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                                <h3 className="text-xl md:text-2xl font-bold text-[#054068] w-full text-center">
                                    Minhas informações
                                </h3>
                                <button 
                                    type="button" 
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center" 
                                    onClick={toggleProfileModal}
                                >
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Fechar</span>
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <h1 className='text-lg md:text-xl text-[#054068] font-bold mb-1'>Nome do Professor:</h1>
                                    <p className='bg-blue-50 w-full rounded-lg text-gray-700 p-3 text-sm md:text-base'>
                                        Rafael Teixeira de Almeida
                                    </p>
                                </div>

                                <div>
                                    <h1 className='text-lg md:text-xl text-[#054068] font-bold mb-1'>CPF de login:</h1>
                                    <p className='bg-blue-50 w-full rounded-lg text-gray-700 p-3 text-sm md:text-base'>
                                        666.666.666
                                    </p>
                                </div>

                                <div>
                                    <h1 className='text-lg md:text-xl text-[#054068] font-bold mb-1'>Turma:</h1>
                                    <p className='bg-blue-50 w-full rounded-lg text-gray-700 p-3 text-sm md:text-base'>
                                        2TD
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

  
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
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Fechar</span>
                            </button>
                            
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
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
        </>
    );
}