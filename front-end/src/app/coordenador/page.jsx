"use client";

import HeaderCoordenador from "../components/headerCoordenador/page";
import Footer from "../components/Footer/page";
import Card from "../components/Card/CardCriar";
import CardUpdate from '../components/Card/CardUpdate';
import CardRemover from '../components/Card/CardRemover';
import CardProf from '../components/CardProf/CardProfCriar';
import CardProfRemover from '../components/CardProf/CardProfRemover';
import CardProfUpdate from '../components/CardProf/CardProfUpdate';
import ModalBuscaAluno from "../components/Modal/ModalGetAlunos";
import ModalBuscaProfessor from "../components/Modal/ModalGetProfessores";
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "next/navigation";

import './coord.css';

import GraficoPizza from "../components/graficos/graficoCoordenador.jsx"; 

export default function Coordenador() {
   
    const searchParams = useSearchParams();
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;

    // Estados da UI e de dados
    const [turmaAberta, setTurmaAberta] = useState(null);
    const [turmaAbertaProfessores, setTurmaAbertaProfessores] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [modalProfessorAberto, setModalProfessorAberto] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [turmasAlunos, setTurmasAlunos] = useState([]);
    const [turmasProfessores, setTurmasProfessores] = useState([]);
    const [dadosAgregadosPorTurma, setDadosAgregadosPorTurma] = useState({});
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const vindoDeRedirect = searchParams.get("redirect") === "true";

        if (vindoDeRedirect) {
            setMostrarMensagem(true);
            const url = new URL(window.location.href);
            url.searchParams.delete("redirect");
            window.history.replaceState({}, "", url.toString());
        }
    }, [searchParams]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            buscarDadosCoordenador(storedToken);
        } else {
            setErro("Sessão expirada ou inválida. Por favor, faça login novamente.");    
            setCarregando(false);
        }
        window.scrollTo(0, 0);
    }, []);

    const buscarDadosCoordenador = async (token) => {
        setCarregando(true);    
        setErro(null);

        try {
            const response = await fetch(`${backendUrl}/coordenador/listar`, {
                method: 'GET',    
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();    
                const listaDeDados = Array.isArray(data) ? data : [];
                processarDados(listaDeDados);
            } else {
                const errorText = await response.text();    
                setErro(`Erro ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error("ERRO CRÍTICO na requisição fetch:", error);    
            setErro("Falha na conexão com o servidor.");
        } finally {
            setCarregando(false);    
        }
    };

    const processarDados = (dados) => {
        if (!dados || dados.length === 0) {
            setTurmasAlunos([]);    
            setTurmasProfessores([]);
            setDadosAgregadosPorTurma({});
            return;
        }

        const mapaTurmasAlunos = new Map();
        const mapaTurmasProfessores = new Map();
        const mapaDadosAgregados = {};

        dados.forEach((item) => {
            if (!item || !item.turma || !item.RA_aluno) return;    

            const turmaNome = item.turma.toUpperCase();
            
            if (!mapaDadosAgregados[turmaNome]) {
                mapaDadosAgregados[turmaNome] = {
                    totalFaltas: parseInt(item.total_faltas_turma) || 0,    
                    totalAulas: parseInt(item.total_aulas_turma) || 0,
                    totalAlunos: parseInt(item.total_alunos) || 0,
                };
            }

            if (!mapaTurmasAlunos.has(turmaNome)) {
                mapaTurmasAlunos.set(turmaNome, { nome: turmaNome, alunos: new Map() });    
            }
            const turmaAlunos = mapaTurmasAlunos.get(turmaNome);
            if (!turmaAlunos.alunos.has(item.RA_aluno)) {
                const frequenciaNumerica = item.media_percentual_frequencia ?? 0;
                const frequenciaArredondada = Math.round(frequenciaNumerica);
                const frequenciaFormatada = `${frequenciaArredondada}%`;

                turmaAlunos.alunos.set(item.RA_aluno, {
                    nome: item.nome_aluno,    
                    ra: item.RA_aluno,
                    frequencia: frequenciaFormatada,
                });
            }

            if (!item.cpf_professor) return;
            const turmaProfNome = item.turma_professor ? item.turma_professor.toUpperCase() : turmaNome;
            if (!mapaTurmasProfessores.has(turmaProfNome)) {
                mapaTurmasProfessores.set(turmaProfNome, { nome: turmaProfNome, professores: new Map() });    
            }
            const turmaProfessores = mapaTurmasProfessores.get(turmaProfNome);
            if (!turmaProfessores.professores.has(item.cpf_professor)) {
                turmaProfessores.professores.set(item.cpf_professor, {
                    nome: item.nome_professor,    
                    cpf: item.cpf_professor,
                    disciplina: item.materia,
                });
            }
        });

        let turmasAlunosArray = Array.from(mapaTurmasAlunos.values()).map(turma => ({ ...turma, alunos: Array.from(turma.alunos.values()) }));
        let turmasProfessoresArray = Array.from(mapaTurmasProfessores.values()).map(turma => ({ ...turma, professores: Array.from(turma.professores.values()) }));
        
        const ordemDesejada = ['2MD', '2TD', '2ND'];
        const customSort = (a, b) => {
            const indexA = ordemDesejada.indexOf(a.nome);    
            const indexB = ordemDesejada.indexOf(b.nome);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.nome.localeCompare(b.nome);
        };
        turmasAlunosArray.sort(customSort);
        turmasProfessoresArray.sort(customSort);
        
        setTurmasAlunos(turmasAlunosArray);
        setTurmasProfessores(turmasProfessoresArray);
        setDadosAgregadosPorTurma(mapaDadosAgregados);
    };

    const toggleTurma = (turmaNome) => setTurmaAberta(turmaAberta === turmaNome ? null : turmaNome);
    const toggleTurmaProfessores = (turmaNome) => setTurmaAbertaProfessores(turmaAbertaProfessores === turmaNome ? null : turmaNome);

    const todosAlunos = useMemo(() => turmasAlunos.flatMap(turma => turma.alunos), [turmasAlunos]);
    const todosProfessores = useMemo(() => turmasProfessores.flatMap(turma => turma.professores), [turmasProfessores]);

    if (carregando) {
        return (
            <>    
                {mostrarMensagem && (
                    <div className="slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
                        <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
                            <p className="text-black font-bold">Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b> </p>
                        </div>
                    </div>
                )}

                <div className="bg-[#c9e8ff] min-h-screen flex flex-col">
                    <HeaderCoordenador />
                    <div className="flex-grow flex justify-center items-center">
                        <h2 className="text-2xl font-bold text-[#054068]">Carregando dados...</h2>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
    
    if (erro) {
        return (    
            <div className="bg-[#c9e8ff] min-h-screen flex flex-col">
                <HeaderCoordenador />
                <div className="flex-grow flex justify-center items-center">
                    <div className="text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <h2 className="text-2xl font-bold">Ocorreu um Erro</h2>
                        <p className="mt-2">{erro}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    
    return (
        <>    
            {mostrarMensagem && (
                <div className="slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
                    <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
                        <p className="text-black font-bold">Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b> </p>
                    </div>
                </div>
            )}
        
            <div className="bg-[#c9e8ff] min-h-screen">
                <HeaderCoordenador />

                <div className="p-4 md:p-10 text-2xl md:text-3xl text-center text-[#054068]">
                    <h1 className="font-semibold">Gerenciar</h1>
                    <button
                        onClick={() => setModalAberto(true)}
                        className="cursor-pointer font-bold bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300 border-2 border-solid border-blue-200 mt-4 text-white hover:text-gray-500 text-xs md:text-sm text-center px-4 py-2 md:p-3 rounded-full h-10 md:h-11"
                    >
                        Buscar Aluno
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 mb-8 px-4">
                    <Card />
                    <CardRemover />
                    <CardUpdate />
                </div>
                
                <h1 className="text-2xl md:text-3xl text-center text-[#054068] font-semibold mt-8 md:mt-12 mb-4">Detalhes por Turma</h1>

                {turmasAlunos.length === 0 ? (
                    <div className="text-center p-6 md:p-10 my-6 md:my-10 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg max-w-4xl mx-auto">    
                        <h2 className="text-lg md:text-xl font-bold">Nenhuma Turma Encontrada</h2>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 mt-6 md:mt-10 px-8 md:px-15">    
                        {turmasAlunos.map((turma) => (
                            <div key={turma.nome} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">    
                                <div className="flex justify-between items-center p-4 md:p-6 cursor-pointer hover:bg-sky-50 transition-colors" onClick={() => toggleTurma(turma.nome)}>
                                    <div className="bg-sky-100 text-sky-800 px-3 py-1 md:px-4 md:py-2 rounded-full font-medium shadow-inner">
                                        <h2 className="text-xs sm:text-sm md:text-lg">Detalhes da Turma: {turma.nome}</h2>
                                    </div>
                                    <svg className={`w-5 h-5 md:w-6 md:h-6 text-sky-600 transition-transform ${turmaAberta === turma.nome ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {turmaAberta === turma.nome && (
                                    <div className="p-2 md:p-4 border-t border-gray-200">    
                                        <div className="mb-4 md:mb-8 flex justify-center">
                                            <div className="w-full max-w-md">
                                                <GraficoPizza
                                                    key={`grafico-${turma.nome}`}
                                                    titulo={`Visão Geral de Frequência - Turma ${turma.nome}`}
                                                    dadosDaTurma={dadosAgregadosPorTurma[turma.nome]}
                                                />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-lg md:text-xl font-semibold text-sky-800 mb-3 md:mb-4 ml-2">Lista de Alunos</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs md:text-sm text-left text-gray-800">
                                                <thead className="text-xs bg-[#054068] text-white">
                                                    <tr>
                                                        <th scope="col" className="px-3 py-2 md:px-6 md:py-3">Nome do Aluno</th>
                                                        <th scope="col" className="px-3 py-2 md:px-6 md:py-3">RA</th>
                                                        <th scope="col" className="px-3 py-2 md:px-6 md:py-3">Frequência Geral</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {turma.alunos.map((aluno, index) => (
                                                        <tr key={aluno.ra} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}>    
                                                            <td className="px-3 py-2 md:px-6 md:py-4 font-medium whitespace-nowrap">{aluno.nome}</td>
                                                            <td className="px-3 py-2 md:px-6 md:py-4">{aluno.ra}</td>
                                                            <td className="px-3 py-2 md:px-6 md:py-4">{aluno.frequencia}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-5 p-4 md:p-10">
                    <h1 className="text-2xl md:text-3xl text-center text-[#054068] font-semibold mb-4 md:mb-5">Gerenciar Professores</h1>

                    <div className="flex justify-center mb-6 md:mb-10">
                        <button
                            onClick={() => setModalProfessorAberto(true)}
                            className="cursor-pointer font-bold bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300 text-white hover:text-gray-500 text-xs md:text-sm text-center px-4 py-2 md:p-3 rounded-full h-10 md:h-11"
                        >
                            Buscar Professor
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 px-4">
                        <CardProf />
                        <CardProfRemover />
                        <CardProfUpdate />
                    </div>

                    {turmasProfessores.length === 0 ? (
                        <div className="text-center p-6 md:p-10 my-6 md:my-10 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg max-w-4xl mx-auto">    
                            <h2 className="text-lg md:text-xl font-bold">Nenhum Professor Encontrado</h2>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 mt-6 md:mt-10 px-4">    
                            {turmasProfessores.map((turma) => (
                                <div key={`prof-${turma.nome}`} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">    
                                    <div
                                        className="flex justify-between items-center p-4 md:p-6 cursor-pointer hover:bg-sky-50 transition-colors"
                                        onClick={() => toggleTurmaProfessores(turma.nome)}
                                    >
                                        <div className="bg-sky-100 text-sky-800 px-3 py-1 md:px-4 md:py-2 rounded-full font-medium shadow-inner">
                                            <h2 className="text-xs sm:text-sm md:text-lg">Professores - Turma: {turma.nome}</h2>
                                        </div>
                                        <svg
                                            className={`w-5 h-5 md:w-6 md:h-6 text-sky-600 transition-transform ${turmaAbertaProfessores === turma.nome ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {turmaAbertaProfessores === turma.nome && (
                                        <div className="p-2 md:p-4 border-t border-gray-200">    
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-xs md:text-sm text-left text-gray-800">
                                                    <thead className="text-xs bg-[#054068] text-white">
                                                        <tr>
                                                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3">Nome do Professor</th>
                                                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3">CPF</th>
                                                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3">Disciplina</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {turma.professores.map((professor, index) => (
                                                            <tr    
                                                                key={professor.cpf}
                                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}
                                                            >
                                                                <td className="px-3 py-2 md:px-6 md:py-4 font-medium whitespace-nowrap">{professor.nome}</td>
                                                                <td className="px-3 py-2 md:px-6 md:py-4">{professor.cpf}</td>
                                                                <td className="px-3 py-2 md:px-6 md:py-4">{professor.disciplina}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <ModalBuscaAluno
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    onSelectAluno={setAlunoSelecionado}
                    alunos={todosAlunos}
                />
                <ModalBuscaProfessor
                    isOpen={modalProfessorAberto}
                    onClose={() => setModalProfessorAberto(false)}
                    onSelectProfessor={setProfessorSelecionado}
                    professores={todosProfessores}
                />

                <Footer />
            </div>
        </>
    );
}