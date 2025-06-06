"use client";

import HeaderCoordenador from "../components/headerCoordenador/page";
import Footer from "../components/Footer/page";

// import Card from "../components/Card/CardCriar";
import CardUpdate from '../components/Card/CardUpdate';
import CardRemover from '../components/Card/CardRemover';

import CardProf from '../components/CardProf/CardProfCriar'
import CardProfRemover from '../components/CardProf/CardProfRemover'
import CardProfUpdate from '../components/CardProf/CardProfUpdate'

import ModalBuscaAluno from "../components/Modal/ModalGetAlunos";
import ModalBuscaProfessor from "../components/Modal/ModalGetProfessores";
import { useState } from 'react';


const alunos = [
    { nome: "Felipe Cardoso", ra: "100000011", frequencia: "56%", turma: "2MD" },
    { nome: "Carolina Pires", ra: "100000012", frequencia: "92%", turma: "2MD" },
    { nome: "Bruno Santos", ra: "100000013", frequencia: "58%", turma: "2TD" },
    { nome: "Letícia Nunes", ra: "100000014", frequencia: "31%", turma: "2TD" },
    { nome: "Rafael Teixeira", ra: "100000015", frequencia: "40%", turma: "2ND" },
    { nome: "Amanda Duarte", ra: "100000016", frequencia: "48%", turma: "2ND" },
    { nome: "Vinícius Gomes", ra: "100000017", frequencia: "67%", turma: "2MD" },
    { nome: "Beatriz Carvalho", ra: "100000018", frequencia: "29%", turma: "2TD" },
    { nome: "Henrique Melo", ra: "100000019", frequencia: "46%", turma: "2ND" },
    { nome: "Camila Araújo", ra: "100000020", frequencia: "35%", turma: "2MD" },
];


const professores = [
    { nome: "Ana Silva", cpf: "111.222.333-44", disciplina: "LER", turma: "2MD" },
    { nome: "Carlos Oliveira", cpf: "222.333.444-55", disciplina: "ARI", turma: "2MD" },
    { nome: "Mariana Santos", cpf: "333.444.555-66", disciplina: "LOPAL", turma: "2MD" },
    { nome: "Pedro Costa", cpf: "444.555.666-77", disciplina: "PBE", turma: "2MD" },
    { nome: "Juliana Pereira", cpf: "555.666.777-88", disciplina: "SOP", turma: "2MD" },
    
    { nome: "Roberto Alves", cpf: "666.777.888-99", disciplina: "LER", turma: "2TD" },
    { nome: "Fernanda Lima", cpf: "777.888.999-00", disciplina: "ARI", turma: "2TD" },
    { nome: "Lucas Mendes", cpf: "888.999.000-11", disciplina: "LOPAL", turma: "2TD" },
    { nome: "Patrícia Rocha", cpf: "999.000.111-22", disciplina: "PBE", turma: "2TD" },
    { nome: "Gustavo Neves", cpf: "000.111.222-33", disciplina: "SOP", turma: "2TD" },
    
    { nome: "Sandra Vieira", cpf: "123.456.789-00", disciplina: "LER", turma: "2ND" },
    { nome: "Ricardo Souza", cpf: "234.567.890-11", disciplina: "ARI", turma: "2ND" },
    { nome: "Tatiana Martins", cpf: "345.678.901-22", disciplina: "LOPAL", turma: "2ND" },
    { nome: "Eduardo Campos", cpf: "456.789.012-33", disciplina: "PBE", turma: "2ND" },
    { nome: "Vanessa Lopes", cpf: "567.890.123-44", disciplina: "SOP", turma: "2ND" }
];

export default function Coordenador() {
    const [turmaAberta, setTurmaAberta] = useState(null);
    const [turmaAbertaProfessores, setTurmaAbertaProfessores] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [modalProfessorAberto, setModalProfessorAberto] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);

    
    const turmas = [
        { nome: '2MD', alunos: alunos.filter(a => a.turma === '2MD') },
        { nome: '2TD', alunos: alunos.filter(a => a.turma === '2TD') },
        { nome: '2ND', alunos: alunos.filter(a => a.turma === '2ND') }
    ];

    const turmasProfessores = [
        { nome: '2MD', professores: professores.filter(p => p.turma === '2MD') },
        { nome: '2TD', professores: professores.filter(p => p.turma === '2TD') },
        { nome: '2ND', professores: professores.filter(p => p.turma === '2ND') }
    ];

    const toggleTurma = (turma) => {
        setTurmaAberta(turmaAberta === turma ? null : turma);
    };

    const toggleTurmaProfessores = (turma) => {
        setTurmaAbertaProfessores(turmaAbertaProfessores === turma ? null : turma);
    };

    return (
        <div className="bg-[#c9e8ff] min-h-screen">
            <HeaderCoordenador />
            
           
            <div className="p-10 text-3xl text-center text-[#054068]">
                <h1 className="font-semibold">Gerenciar alunos</h1>
                <div>
                    <button
                        onClick={() => setModalAberto(true)}
                        className="cursor-pointer font-medium bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300 border-2 border-solid border-blue-200 mt-4 text-white hover:text-gray-500 text-[12px] text-center p-3  rounded-full h-11"
                    >
                        Buscar Aluno...
                    </button>

                    <ModalBuscaAluno
                        isOpen={modalAberto}
                        onClose={() => setModalAberto(false)}
                        onSelectAluno={setAlunoSelecionado}
                        alunos={alunos}  
                    />
                </div>
            </div>

       
            <div className="flex justify-center gap-10">
                {/* <Card /> pq ele tabem precisa do back end */}
                <CardProf />
                <CardRemover />
                <CardUpdate />
            </div>


            <div className="flex flex-col items-center gap-4 mt-10 px-4">
                {turmas.map((turma) => (
                    <div key={turma.nome} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden ">
                        <div
                            className="flex justify-between items-center p-6 cursor-pointer hover:bg-sky-50 transition-colors"
                            onClick={() => toggleTurma(turma.nome)}
                        >
                            <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner">
                                <h2 className="text-sm sm:text-lg">Turma: {turma.nome}</h2>
                            </div>
                            <svg
                                className={`w-6 h-6 text-sky-600 transition-transform ${turmaAberta === turma.nome ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

           
                        {turmaAberta === turma.nome && (
                            <div className="p-4 border-t border-gray-200">
                                <table className="w-full text-sm text-left text-gray-800">
                                    <thead className="text-xs bg-[#054068] text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nome do Aluno</th>
                                            <th scope="col" className="px-6 py-3">RA</th>
                                            <th scope="col" className="px-6 py-3">Frequência</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {turma.alunos.map((aluno, index) => (
                                            <tr
                                                key={aluno.ra}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}
                                            >
                                                <td className="px-6 py-4 font-medium whitespace-nowrap">{aluno.nome}</td>
                                                <td className="px-6 py-4">{aluno.ra}</td>
                                                <td className="px-6 py-4">{aluno.frequencia}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>

  
            <div className="mt-5 p-10">


                <h1 className="text-3xl text-center text-[#054068] font-semibold mb-5">Gerenciar Professores</h1>

                <div className="flex justify-center mb-10">
                    <button
                    onClick={() => setModalProfessorAberto(true)}
                    className=" cursor-pointer font-medium bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300  text-white hover:text-gray-500 text-[12px] text-center p-3  rounded-full h-11"
                    >
                    Buscar Professor...
                    </button>

                    <ModalBuscaProfessor
                        isOpen={modalProfessorAberto}
                        onClose={() => setModalProfessorAberto(false)}
                        onSelectProfessor={setProfessorSelecionado}
                        professores={professores}  
                    />
                </div>

                <div className="flex justify-center gap-10 ">
                    <CardProf />
                    <CardProfRemover />
                    <CardProfUpdate />
                </div>
                
                <div className="flex flex-col items-center gap-4 mt-10 px-4">
                    {turmasProfessores.map((turma) => (
                        <div key={`prof-${turma.nome}`} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden ">
                            <div
                                className="flex justify-between items-center p-6 cursor-pointer hover:bg-sky-50 transition-colors"
                                onClick={() => toggleTurmaProfessores(turma.nome)}
                            >
                                <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner">
                                    <h2 className="text-sm sm:text-lg">Turma: {turma.nome}</h2>
                                </div>
                                <svg
                                    className={`w-6 h-6 text-sky-600 transition-transform ${turmaAbertaProfessores === turma.nome ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {turmaAbertaProfessores === turma.nome && (
                                <div className="p-4 border-t border-gray-200">
                                    <table className="w-full text-sm text-left text-gray-800">
                                        <thead className="text-xs bg-[#054068] text-white">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Nome do Professor</th>
                                                <th scope="col" className="px-6 py-3">CPF</th>
                                                <th scope="col" className="px-6 py-3">Disciplina</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {turma.professores.map((professor, index) => (
                                                <tr
                                                    key={professor.cpf}
                                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}
                                                >
                                                    <td className="px-6 py-4 font-medium whitespace-nowrap">{professor.nome}</td>
                                                    <td className="px-6 py-4">{professor.cpf}</td>
                                                    <td className="px-6 py-4">{professor.disciplina}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}












// -------------------------------------------codigo original que eu depois vou passar todo o tailwind pra ele :) ------------------------------------------------------------------------------------------

// "use client";

// import HeaderCoordenador from "../components/headerCoordenador/page";
// import Footer from "../components/Footer/page";
// import Card from "../components/Card/CardCriar";
// import CardUpdate from '../components/Card/CardUpdate';
// import CardRemover from '../components/Card/CardRemover';
// import CardProf from '../components/CardProf/CardProfCriar';
// import CardProfRemover from '../components/CardProf/CardProfRemover';
// import CardProfUpdate from '../components/CardProf/CardProfUpdate';
// import ModalBuscaAluno from "../components/Modal/ModalGetAlunos";
// import ModalBuscaProfessor from "../components/Modal/ModalGetProfessores";
// import { useState, useEffect, useMemo } from 'react';
// import { useSearchParams } from "next/navigation";

// import './coord.css';

// import GraficoPizza from "../components/graficos/graficoCoordenador.jsx"; 

// export default function Coordenador() {
   
//     const searchParams = useSearchParams();
//    const [mostrarMensagem, setMostrarMensagem] = useState(false);

//     const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;

//     // Estados da UI e de dados
//     const [turmaAberta, setTurmaAberta] = useState(null);
//     const [turmaAbertaProfessores, setTurmaAbertaProfessores] = useState(null);
//     const [modalAberto, setModalAberto] = useState(false);
//     const [alunoSelecionado, setAlunoSelecionado] = useState(null);
//     const [modalProfessorAberto, setModalProfessorAberto] = useState(false);
//     const [professorSelecionado, setProfessorSelecionado] = useState(null);
//     const [turmasAlunos, setTurmasAlunos] = useState([]);
//     const [turmasProfessores, setTurmasProfessores] = useState([]);
//     const [dadosAgregadosPorTurma, setDadosAgregadosPorTurma] = useState({});
//     const [erro, setErro] = useState(null);
//     const [carregando, setCarregando] = useState(true);


//     useEffect(() => {
//         const vindoDeRedirect = searchParams.get("redirect") === "true";

//         if (vindoDeRedirect) {
//             setMostrarMensagem(true);
//             const url = new URL(window.location.href);
//             url.searchParams.delete("redirect");
//             window.history.replaceState({}, "", url.toString());
//         }
//     }, [searchParams]);


//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         if (storedToken) {
//             buscarDadosCoordenador(storedToken);















//         } else {
//             setErro("Sessão expirada ou inválida. Por favor, faça login novamente.");    
//             setCarregando(false);
//         }
//         window.scrollTo(0, 0);
//     }, []);

//     const buscarDadosCoordenador = async (token) => {
//         setCarregando(true);    
//         setErro(null);

//         try {
//             const response = await fetch(`${backendUrl}/coordenador/listar`, {
//                 method: 'GET',    
//                 headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             });

//             if (response.ok) {
//                 const data = await response.json();    
//                 const listaDeDados = Array.isArray(data) ? data : [];
//                 processarDados(listaDeDados);
//             } else {
//                 const errorText = await response.text();    
//                 setErro(`Erro ${response.status}: ${errorText}`);
//             }
//         } catch (error) {
//             console.error("ERRO CRÍTICO na requisição fetch:", error);    
//             setErro("Falha na conexão com o servidor.");
//         } finally {
//             setCarregando(false);    
//         }
//     };

//     const processarDados = (dados) => {
//         if (!dados || dados.length === 0) {
//             setTurmasAlunos([]);    
//             setTurmasProfessores([]);
//             setDadosAgregadosPorTurma({});
//             return;
//         }

//         const mapaTurmasAlunos = new Map();
//         const mapaTurmasProfessores = new Map();
//         const mapaDadosAgregados = {};

//         dados.forEach((item) => {
//             if (!item || !item.turma || !item.RA_aluno) return;    

//             const turmaNome = item.turma.toUpperCase();
            
//             if (!mapaDadosAgregados[turmaNome]) {
//                 mapaDadosAgregados[turmaNome] = {
//                     totalFaltas: parseInt(item.total_faltas_turma) || 0,    
//                     totalAulas: parseInt(item.total_aulas_turma) || 0,
//                     totalAlunos: parseInt(item.total_alunos) || 0,
//                 };
//             }

//             if (!mapaTurmasAlunos.has(turmaNome)) {
//                 mapaTurmasAlunos.set(turmaNome, { nome: turmaNome, alunos: new Map() });    
//             }
//             const turmaAlunos = mapaTurmasAlunos.get(turmaNome);
//             if (!turmaAlunos.alunos.has(item.RA_aluno)) {
                    
                
//                 const frequenciaNumerica = item.media_percentual_frequencia ?? 0;
//                 const frequenciaArredondada = Math.round(frequenciaNumerica);
//                 const frequenciaFormatada = `${frequenciaArredondada}%`;

//                 turmaAlunos.alunos.set(item.RA_aluno, {
//                     nome: item.nome_aluno,    
//                     ra: item.RA_aluno,
//                     frequencia: frequenciaFormatada,
//                 });
//             }

//             if (!item.cpf_professor) return;
//             const turmaProfNome = item.turma_professor ? item.turma_professor.toUpperCase() : turmaNome;
//             if (!mapaTurmasProfessores.has(turmaProfNome)) {
//                 mapaTurmasProfessores.set(turmaProfNome, { nome: turmaProfNome, professores: new Map() });    
//             }
//             const turmaProfessores = mapaTurmasProfessores.get(turmaProfNome);
//             if (!turmaProfessores.professores.has(item.cpf_professor)) {
//                 turmaProfessores.professores.set(item.cpf_professor, {
//                     nome: item.nome_professor,    
//                     cpf: item.cpf_professor,
//                     disciplina: item.materia,
//                 });
//             }
//         });

//         let turmasAlunosArray = Array.from(mapaTurmasAlunos.values()).map(turma => ({ ...turma, alunos: Array.from(turma.alunos.values()) }));
//         let turmasProfessoresArray = Array.from(mapaTurmasProfessores.values()).map(turma => ({ ...turma, professores: Array.from(turma.professores.values()) }));
        
//         const ordemDesejada = ['2MD', '2TD', '2ND'];
//         const customSort = (a, b) => {
//             const indexA = ordemDesejada.indexOf(a.nome);    
//             const indexB = ordemDesejada.indexOf(b.nome);
//             if (indexA !== -1 && indexB !== -1) return indexA - indexB;
//             if (indexA !== -1) return -1;
//             if (indexB !== -1) return 1;
//             return a.nome.localeCompare(b.nome);
//         };
//         turmasAlunosArray.sort(customSort);
//         turmasProfessoresArray.sort(customSort);
        
//         setTurmasAlunos(turmasAlunosArray);
//         setTurmasProfessores(turmasProfessoresArray);
//         setDadosAgregadosPorTurma(mapaDadosAgregados);
//     };

//     const toggleTurma = (turmaNome) => setTurmaAberta(turmaAberta === turmaNome ? null : turmaNome);
//     const toggleTurmaProfessores = (turmaNome) => setTurmaAbertaProfessores(turmaAbertaProfessores === turmaNome ? null : turmaNome);

//     const todosAlunos = useMemo(() => turmasAlunos.flatMap(turma => turma.alunos), [turmasAlunos]);
//     const todosProfessores = useMemo(() => turmasProfessores.flatMap(turma => turma.professores), [turmasProfessores]);

//     if (carregando) {
//         return (
// <>    

//             {mostrarMensagem && (
    
//                 <div className=" slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
//                     <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
//                         <p className=" text-black font-bold">Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b> </p>
//                     </div></div>
//             )}

//             <div className="bg-[#c9e8ff] min-h-screen flex flex-col">
//                 <HeaderCoordenador />
//                 <div className="flex-grow flex justify-center items-center">
//                     <h2 className="text-2xl font-bold text-[#054068]">Carregando dados...</h2>
//                 </div>
//                 <Footer />
//             </div>
//             </>
//         );
//     }
    
//     if (erro) {
//         return (
                
//             <div className="bg-[#c9e8ff] min-h-screen flex flex-col">
//                 <HeaderCoordenador />
//                 <div className="flex-grow flex justify-center items-center">
//                     <div className="text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//                         <h2 className="text-2xl font-bold">Ocorreu um Erro</h2>
//                         <p className="mt-2">{erro}</p>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         );
//     }
    
//     return (
//         <>    

//             {mostrarMensagem && (
    
//                 <div className=" slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
//                     <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
//                         <p className=" text-black font-bold">Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b> </p>
//                     </div></div>
//             )}
        
//         <div className="bg-[#c9e8ff] min-h-screen">
//             <HeaderCoordenador />

//             <div className="p-10 text-3xl text-center text-[#054068]">
//                 <h1 className="font-semibold">Gerenciar</h1>
//                 <button
//                     onClick={() => setModalAberto(true)}
//                     className="cursor-pointer font-bold bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300 border-2 border-solid border-blue-200 mt-4 text-white hover:text-gray-500 text-[12px] text-center p-3 rounded-full h-11"
//                 >
//                     Buscar Aluno
//                 </button>
//             </div>

//             <div className="flex justify-center gap-10 mb-8">
//                 <Card />
//                 <CardRemover />
//                 <CardUpdate />
//             </div>
            
//             <h1 className="text-3xl text-center text-[#054068] font-semibold mt-12 mb-4">Detalhes por Turma</h1>

//             {turmasAlunos.length === 0 ? (
//                 <div className="text-center p-10 my-10 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg max-w-4xl mx-auto">    
//                     <h2 className="text-xl font-bold">Nenhuma Turma Encontrada</h2>
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center gap-4 mt-10 px-4">    
//                     {turmasAlunos.map((turma) => (
//                         <div key={turma.nome} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden ">    
//                             <div className="flex justify-between items-center p-6 cursor-pointer hover:bg-sky-50 transition-colors" onClick={() => toggleTurma(turma.nome)}>
//                                 <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner">
//                                     <h2 className="text-sm sm:text-lg">Detalhes da Turma: {turma.nome}</h2>
//                                 </div>
//                                 <svg className={`w-6 h-6 text-sky-600 transition-transform ${turmaAberta === turma.nome ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>

//                             {turmaAberta === turma.nome && (
//                                 <div className="p-4 border-t border-gray-200">    
//                                     <div className="mb-8 flex justify-center">
//                                         <div className="w-full max-w-md">
//                                             <GraficoPizza
//                                                 key={`grafico-${turma.nome}`}
//                                                 titulo={`Visão Geral de Frequência - Turma ${turma.nome}`}
//                                                 dadosDaTurma={dadosAgregadosPorTurma[turma.nome]}
//                                             />
//                                         </div>
//                                     </div>
                                    
//                                     <h3 className="text-xl font-semibold text-sky-800 mb-4 ml-2">Lista de Alunos</h3>
//                                     <table className="w-full text-sm text-left text-gray-800">
//                                         <thead className="text-xs bg-[#054068] text-white">
//                                             <tr>
//                                                 <th scope="col" className="px-6 py-3">Nome do Aluno</th>
//                                                 <th scope="col" className="px-6 py-3">RA</th>
//                                                 <th scope="col" className="px-6 py-3">Frequência Geral</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {turma.alunos.map((aluno, index) => (
//                                                 <tr key={aluno.ra} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}>    
//                                                     <td className="px-6 py-4 font-medium whitespace-nowrap">{aluno.nome}</td>
//                                                     <td className="px-6 py-4">{aluno.ra}</td>
//                                                     <td className="px-6 py-4">{aluno.frequencia}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
            
//             <div className="mt-5 p-10">
//                 <h1 className="text-3xl text-center text-[#054068] font-semibold mb-5">Gerenciar Professores</h1>

//                 <div className="flex justify-center mb-10">
//                     <button
//                         onClick={() => setModalProfessorAberto(true)}
//                         className=" cursor-pointer font-bold bg-[#1f557b] hover:bg-[#0e3754] transition-all duration-300  text-white hover:text-gray-500 text-[12px] text-center p-3  rounded-full h-11"
//                     >
//                         Buscar Professor
//                     </button>
//                 </div>

//                 <div className="flex justify-center gap-10 ">
//                     <CardProf />
//                     <CardProfRemover />
//                     <CardProfUpdate />
//                 </div>

//                 {turmasProfessores.length === 0 ? (
//                      <div className="text-center p-10 my-10 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg max-w-4xl mx-auto">    
//                         <h2 className="text-xl font-bold">Nenhum Professor Encontrado</h2>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center gap-4 mt-10 px-4">    
//                         {turmasProfessores.map((turma) => (
//                              <div key={`prof-${turma.nome}`} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden ">    
//                               <div
//                                     className="flex justify-between items-center p-6 cursor-pointer hover:bg-sky-50 transition-colors"
//                                     onClick={() => toggleTurmaProfessores(turma.nome)}
//                                 >
//                                     <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner">
//                                         <h2 className="text-sm sm:text-lg">Professores - Turma: {turma.nome}</h2>
//                                     </div>
//                                     <svg
//                                         className={`w-6 h-6 text-sky-600 transition-transform ${turmaAbertaProfessores === turma.nome ? 'rotate-180' : ''}`}
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </div>

//                                 {turmaAbertaProfessores === turma.nome && (
//                                     <div className="p-4 border-t border-gray-200">    
//                                         <table className="w-full text-sm text-left text-gray-800">
//                                             <thead className="text-xs bg-[#054068] text-white">
//                                                 <tr>
//                                                     <th scope="col" className="px-6 py-3">Nome do Professor</th>
//                                                     <th scope="col" className="px-6 py-3">CPF</th>
//                                                     <th scope="col" className="px-6 py-3">Disciplina</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {turma.professores.map((professor, index) => (
//                                                     <tr    
//                                                         key={professor.cpf}
//                                                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100 transition-all`}
//                                                     >
//                                                         <td className="px-6 py-4 font-medium whitespace-nowrap">{professor.nome}</td>
//                                                         <td className="px-6 py-4">{professor.cpf}</td>
//                                                         <td className="px-6 py-4">{professor.disciplina}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <ModalBuscaAluno
//                 isOpen={modalAberto}
//                 onClose={() => setModalAberto(false)}
//                 onSelectAluno={setAlunoSelecionado}
//                 alunos={todosAlunos}
//             />
//             <ModalBuscaProfessor
//                 isOpen={modalProfessorAberto}
//                 onClose={() => setModalProfessorAberto(false)}
//                 onSelectProfessor={setProfessorSelecionado}
//                 professores={todosProfessores}
//             />

//             <Footer />
//         </div>
//         </>
//     );
// }






