"use client";

import HeaderCoordenador from "../components/headerCoordenador/page";
import Footer from "../components/Footer/page";

import Card from "../components/Card/Card";
import CardUpdate from '../components/Card/CardUpdate';
import CardRemover from '../components/Card/CardRemover';
import ModalBuscaAluno from "../components/Modal/ModalGetAlunos";
import { useState } from 'react';

// alunos para test
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

export default function Coordenador() {
    const [turmaAberta, setTurmaAberta] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

    // filtrando as turmas (para o botao toggle)
    const turmas = [
        { nome: '2MD', alunos: alunos.filter(a => a.turma === '2MD') },
        { nome: '2TD', alunos: alunos.filter(a => a.turma === '2TD') },
        { nome: '2ND', alunos: alunos.filter(a => a.turma === '2ND') }
    ];

    // abrir e fechar turma
    const toggleTurma = (turma) => {
        setTurmaAberta(turmaAberta === turma ? null : turma);
    };

    return (
        <div className="bg-[#c9e8ff] min-h-screen">
            <HeaderCoordenador />
            <div className="p-10 text-3xl text-center text-[#054068]">
                <h1 className="font-extrabold">Gerenciar alunos</h1>
                <div>
                    <button
                        onClick={() => setModalAberto(true)}
                        className="cursor-pointer font-bold bg-blue-300 mt-2 text-gray-600 text-[22px] p-5 rounded-[15px]"
                    >
                        Buscar Aluno
                    </button>

                    {/* lembrar de sempre chamar o modal*/}
                    <ModalBuscaAluno
                        isOpen={modalAberto}
                        onClose={() => setModalAberto(false)}
                        onSelectAluno={setAlunoSelecionado}
                        alunos={alunos}  
                    />
                </div>
            </div>

            {/* div dos cards */}
            <div className="flex justify-center gap-10">
                <Card />
                <CardRemover />
                <CardUpdate />
            </div>

            <div className="flex flex-col items-center gap-4 mt-10 px-4">
                {turmas.map((turma) => (
                    <div key={turma.nome} className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
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


                        {/* tables das turmas */}
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

            <div className="mt-10 p-10">
                <h1 className="text-3xl text-center text-[#054068] font-extrabold">Gerenciar Professores</h1>
            </div>

            <Footer />
        </div>
    );
}
