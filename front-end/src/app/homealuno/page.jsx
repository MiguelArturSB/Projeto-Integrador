'use client'

import Header from '../components/Header/header.jsx'
import Footer from '../components/Footer/page.jsx'
import ModalHistorico from '../components/Modal/ModalHistorico.jsx';
import './alun.css'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import GraficoPizza from '../components/graficos/graficoAluno.jsx';

export default function HomeAluno() {
    const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;

    const searchParams = useSearchParams();
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded, setDecoded] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [presencas, setPresencas] = useState([]);
    const [erro, setErro] = useState('');

    const handleCloseWelcome = () => setShowWelcome(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const vindoDeRedirect = searchParams.get("redirect") === "true";
        if (vindoDeRedirect) {
            setMostrarMensagem(true);
            const url = new URL(window.location.href);
            url.searchParams.delete("redirect");
            window.history.replaceState({}, "", url.toString());
        }
    }, [searchParams]);

    const handleSubmit = async (token, decoded) => {
        if (!decoded?.idAluno) return;

        try {
            const payload = { idAluno: decoded.idAluno };
            const response = await fetch(`${backendUrl}/aluno/viewA`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (response.ok) {
                setPresencas(data.view || []);
                setErro('');
            } else {
                setErro(data.mensagem || "Erro ao buscar dados de presença.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErro("Erro de conexão com o servidor. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                setToken(storedToken);
                setDecoded(decodedToken);
                handleSubmit(storedToken, decodedToken);
            } catch (e) {
                console.error("Token inválido:", e);
                setErro("Sessão inválida. Por favor, faça login novamente.");
            }
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {mostrarMensagem && (
                <div className="slide-in-volta bg-sky-800 z-[9999] fixed inset-0 flex justify-center items-center">
                    <p className="text-black text-2xl sm:text-4xl font-bold">
                        Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b>
                    </p>
                </div>
            )}

            {showWelcome && presencas.length > 0 && (
                <div className="bg-blue-100 p-4 md:p-6 rounded-lg shadow-lg m-4">
                    <div className="flex justify-between items-start text-[#054068]">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Olá, {presencas[0].nome_aluno}!
                            </h1>
                            <p className="text-base sm:text-lg mt-2">Você está logado(a).</p>
                        </div>
                        <button
                            onClick={handleCloseWelcome}
                            className="text-2xl text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
                            aria-label="Fechar"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <Header />

            <main className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4 my-8'>
                <div className='flex flex-col items-center'>
                    <div className='bg-blue-50 rounded-3xl w-80 md:w-96 max-w-xs sm:max-w-sm shadow-2xl text-gray-600 text-center'>
                        <h4 className='font-bold pt-4 text-base sm:text-lg'>Você possui</h4>
                        <h1 className='font-extrabold text-5xl sm:text-6xl text-[#1d577b] py-2'>
                            {presencas.length > 0 ? presencas[0].total_faltas : '0'}
                        </h1>
                        <h4 className='font-bold pb-4 text-base sm:text-lg'>faltas no semestre atual</h4>
                        <div className='w-full rounded-b-3xl bg-[#1d577b] text-white font-bold p-3 text-sm sm:text-base'>
                            de {presencas.length > 0 ? presencas[0].total_aulas_turma : 'N/A'} aulas no semestre
                        </div>
                    </div>
                    <button
                        onClick={handleOpenModal}
                        className='mt-8 p-4 border-[2px] shadow-inner shadow-gray-400 border-[#054068] bg-blue-50 hover:bg-gray-300 transition-all rounded-full cursor-pointer w-50 font-semibold text-gray-800'
                    >
                        Ver minhas faltas
                    </button>
                </div>

                <div className="flex justify-center w-full max-w-sm lg:max-w-md">
                    <GraficoPizza />
                </div>
            </main>

            <section className='w-full p-4 md:p-8'>
                <div className='bg-white w-full max-w-6xl mx-auto rounded-2xl shadow-lg'>
                    <h1 className='text-center font-bold text-xl sm:text-2xl lg:text-3xl text-shadow-black p-4 text-[#1d577b]'>
                        Resumo por Matéria
                    </h1>
                    <hr className="h-px border-t-0 bg-neutral-200" />
                    <div className="overflow-x-auto p-2 md:p-4">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-[#1d577b] text-white">
                                    <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase">
                                        Matéria
                                    </th>
                                    <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold uppercase">
                                        Faltas
                                    </th>
                                    <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold uppercase">
                                        % Presença
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {presencas.map((aluno, index) => (
                                    <tr key={aluno.materia ? `${aluno.materia}-${index}` : index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                        <td className="py-3 px-2 sm:px-4 border-b border-gray-200 text-sm sm:text-base font-medium text-gray-700">
                                            {aluno.materia}
                                        </td>
                                        <td className="py-3 px-2 sm:px-4 text-center border-b border-gray-200 text-sm sm:text-base">
                                            {aluno.faltas}
                                        </td>
                                        <td className="py-3 px-2 sm:px-4 text-center border-b border-gray-200 text-sm sm:text-base">
                                            {aluno.percentual_frequencia}%
                                        </td>
                                    </tr>
                                ))}
                                {presencas.length === 0 && !erro && (
                                     <tr>
                                        <td colSpan="3" className="text-center p-4 text-gray-500">Carregando dados...</td>
                                     </tr>
                                )}
                                {erro && (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4 text-red-500 font-semibold">{erro}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <ModalHistorico 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                presencas={presencas}
            />

            <Footer />
        </>
    );
}