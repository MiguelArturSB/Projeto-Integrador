'use client' 

import Header from '../components/Header/header.jsx'
import Footer from '../components/Footer/page.jsx'
import { useState, useEffect } from 'react'


export default function HomeAluno() {
    const [showWelcome, setShowWelcome] = useState(true)

    const handleCloseWelcome = () => {
        setShowWelcome(false)
    }

    const presencas = [
        { materia: 'Levantamento de Requisitos (LEV)', faltas: 0, percentual: '100%' },
        { materia: 'Lógica de Programação e Algoritmo (LOPAL)', faltas: 1, percentual: '95%' },
        { materia: 'Arquitetura de redes (ARI)', faltas: 0, percentual: '100%' },
        { materia: 'Programação Back-end (PBE)', faltas: 2, percentual: '90%' },
        { materia: 'Sistemas Operacionais (SOP)', faltas: 1, percentual: '95%' },
    ]
    useEffect(() => {
 
      window.scrollTo(0, 0);
  }, []);


    return (
        <>
            {showWelcome && (
                <div className="text-3xl font-bold">
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between text-[#054068]">
                            <h1>Bem-vindo, Aluno!</h1>
                            <button 
                                onClick={handleCloseWelcome}
                                className=" ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-xl mt-2 text-[#054068]">Você está logado.</p>
                    </div>
                </div>
            )}
            
            <Header />

            <div className='flex justify-center p-10'>
                <div className=' bg-blue-50 rounded-3xl w-125 shadow-2xl text-gray-600 '>
                    <h4 className=' flex justify-center font-bold mt-2'>Você possui</h4>
                    <h1 className='flex justify-center font-extrabold text-4xl text-[#1d577b]'>4</h1>
                    <h4 className=' flex justify-center font-bold mb-2'>faltas no semestre atual</h4>
                    <h1 className='w-full flex justify-center rounded-b-3xl bg-[#1d577b] text-white hover:text-gray-400 font-bold p-2 cursor-pointer'> 
                        <a href='/faltasaluno'>
                        Verificar minhas faltas
                        </a>
                    </h1>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-6 items-center justify-items-center p-4'>
    <div className='bg-white w-full md:w-350 it rounded-2xl shadow-md col-span-1 md:col-span-6'>
        <h1 className='flex justify-center font-bold text-2xl md:text-4xl text-shadow-black p-3 text-[#1d577b]'>
            Presenças por Aluno
        </h1>
        <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <div className="overflow-x-auto p-2 md:p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-[#1d577b] text-white">
                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-sm md:text-base">
                            Materia
                        </th>
                        <th className="py-2 md:py-3 px-2 md:px-4 text-center text-sm md:text-base">
                            Faltas
                        </th>
                        <th className="py-2 md:py-3 px-2 md:px-4 text-center text-sm md:text-base">
                            % presença
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {presencas.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                            <td className="py-2 md:py-3 px-2 md:px-4 border-b border-gray-200 text-sm md:text-base">
                                {item.materia}
                            </td>
                            <td className="py-2 md:py-3 px-2 md:px-4 text-center border-b border-gray-200 text-sm md:text-base">
                                {item.faltas}
                            </td>
                            <td className="py-2 md:py-3 px-2 md:px-4 text-center border-b border-gray-200 text-sm md:text-base">
                                {item.percentual}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

        <Footer />
        </>
    );
}