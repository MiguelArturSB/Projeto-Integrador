"use client";

/*
  Página principal do painel do Professor.
  Permite visualizar, marcar e enviar presença dos alunos de sua turma e disciplina.
  Inclui: header, painel de resumo, tabela de alunos, botão de envio, animações e gráfico.
*/

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import './prof.css';

import HeaderProfessor from '../components/HeaderProfessor/headerprof';
import Footer from '../components/Footer/page.jsx';
import GraficoPizza from '../components/graficos/graficoProfessor.jsx';

export default function ProfessorTable() {
  const searchParams = useSearchParams();
  const [mostrarMensagem, setMostrarMensagem] = useState(false); // Animação pós-login/redirect
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);                      // Lista de alunos da turma
  const [token, setToken] = useState(null);                      // JWT do professor
  const [decoded, setDecoded] = useState(null);                  // Payload decodificado do token
  const [animado, setAnimado] = useState(false);                 // Animação pós-envio de presença
  const [professorInfo, setProfessorInfo] = useState(null);      // Info agregada da turma/matéria
  const [botaoDesativado, setBotaoDesativado] = useState(false); // Desativa botão durante envio
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal de confirmação

  // Mostra animação se vier de redirect/login
  useEffect(() => {
    const vindoDeRedirect = searchParams.get("redirect") === "true";
    if (vindoDeRedirect) {
      setMostrarMensagem(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("redirect");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const backendUrl = `http://localhost:3001`;

  // Ao montar, recupera token, decodifica e busca lista de alunos
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedData = jwtDecode(storedToken);
        setToken(storedToken);
        setDecoded(decodedData);
        view(storedToken, decodedData); // Busca alunos
      } catch (error) {
        console.error("Erro ao decodificar o token (ProfessorTable):", error);
      }
    }
  }, []);

  // Alterna presença/ausência de um aluno localmente na tabela
  const togglePresence = (alunoId) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) =>
        aluno.ID_aluno === alunoId
          ? { ...aluno, presente: !aluno.presente }
          : aluno
      )
    );
  };

  // Abre/fecha modal de confirmação de envio
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  // Função principal: envia presenças e faltas para o backend
  const handleConfirmAndSend = async () => {
    setShowConfirmModal(false);

    if (botaoDesativado) return;
    setBotaoDesativado(true);
    setAnimado(true);

    if (token && decoded && alunos.length > 0) {
      // Separa alunos presentes e ausentes
      const alunosPresentes = alunos.filter((aluno) => aluno.presente);
      const alunosFaltantes = alunos.filter((aluno) => !aluno.presente);
      const requests = [];

      // Marca presença dos presentes (PUT)
      alunosPresentes.forEach(aluno => {
        requests.push(fetch(`${backendUrl}/presenca/registrar`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ materia: decoded?.materia, id: aluno.ID_aluno }),
        }));
      });

      // Marca falta dos ausentes (POST)
      alunosFaltantes.forEach(aluno => {
        requests.push(fetch(`${backendUrl}/presenca/marcarhistorico`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ID_professor: decoded?.ID_professor, ID_aluno: aluno.ID_aluno, materia: decoded?.materia }),
        }));
      });

      // Aguarda todas as requisições terminarem
      await Promise.all(requests).catch(err => console.error("Erro em uma das requisições de presença/falta:", err));

      try {
        // Marca aula como realizada
        const idAlunoReferencia = alunos[0].ID_aluno;
        await fetch(`${backendUrl}/presenca/aula`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ materia: decoded?.materia, idAluno: idAlunoReferencia }),
        });
      } catch (aulaError) {
        console.error("Erro ao marcar aula:", aulaError);
      }
      
      // Atualiza a lista após salvar presenças
      await view(token, decoded);
      
      // Animação de sucesso
      setTimeout(() => {
        setAnimado(false);
      }, 4000); 

    } else {
      setAnimado(false);
      setBotaoDesativado(false);
    }
  };

  // Busca lista de alunos e informações agregadas para o professor
  const view = async (token, decoded) => {
    try {
      const response = await fetch(`${backendUrl}/presenca/viewP`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ turma: decoded?.turma_professor, materia: decoded?.materia }),
      });
      const data = await response.json();
      if (data && Array.isArray(data.view)) {
        // Marca todos como presentes por padrão ao carregar
        const alunosComPresencaInicial = data.view.map((aluno) => ({ ...aluno, presente: true }));
        setAlunos(alunosComPresencaInicial);
        if (data.view.length > 0) {
          setProfessorInfo(data.view[0]);
        } else {
          setProfessorInfo(null);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar presenças:", error);
    }
  };

  return (
    <>
      <HeaderProfessor />
      
      {/* Modal de confirmação de envio de presenças */}
      {showConfirmModal && (
        <div id="confirm-presence-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center" onClick={toggleConfirmModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
              <span className="sr-only">Fechar</span>
            </button>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              <h3 className="mb-5 text-base sm:text-lg font-normal text-gray-700">Tem certeza que deseja enviar as presenças? <br/> Esta ação não poderá ser desfeita.</h3>
           
              <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
                <button onClick={toggleConfirmModal} type="button" className="w-full sm:w-auto py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">Não, cancelar</button>
                <button onClick={handleConfirmAndSend} type="button" className="w-full sm:w-auto text-white bg-[#17577c] hover:bg-[#054068] font-medium rounded-lg text-sm px-5 py-2.5">Sim, confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animação pós-envio de presenças */}
      {animado && (
        <div className="slide-in-loop bg-sky-800 z-[9999] fixed inset-0 flex justify-center items-center">
          <p className="text-black text-3xl sm:text-4xl font-bold">Presenças enviadas!!</p>
        </div>
      )}

      {/* Animação de carregamento pós-login/redirect */}
      {mostrarMensagem && (
        <div className="slide-in-volta bg-sky-800 z-[9999] fixed inset-0 flex justify-center items-center">
          <p className="text-black text-3xl sm:text-4xl font-bold">Carregando <b>.</b><b>.</b><b>.</b></p>
        </div>
      )}

      {/* Painel principal do professor */}
      <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <h1 className="font-bold text-gray-800 mb-6 border-b pb-4 text-2xl sm:text-3xl lg:text-4xl">Painel de Presença</h1>
          
          {/* Resumo superior: turma, aulas totais, aulas marcadas, matéria */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center mb-6 gap-3 sm:gap-4">
            <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner text-sm w-full sm:w-auto text-center">Turma: <span className="font-semibold">{decoded?.turma_professor}</span></div>
            <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-medium shadow-inner text-sm w-full sm:w-auto text-center">Aulas Totais: <span className="font-semibold">{professorInfo?.qntd_aula}</span></div>
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium shadow-inner text-sm w-full sm:w-auto text-center">Aulas Marcadas: <span className="font-semibold">{professorInfo?.aulas_dadas}</span></div>
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium shadow-inner text-sm w-full sm:w-auto text-center">Matéria: <span className="font-semibold">{decoded?.materia}</span></div>
          </div>

          {/* Tabela de alunos para marcar presença */}
          <div className="overflow-x-auto rounded-xl shadow-md ">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-[#1d577b]">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">Nome</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 hidden sm:table-cell">RA</th>
                  <th scope="col" className="px-4 py-3 sm:px-6">Frequência</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 text-center">Presença</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.ID_aluno} className="bg-white odd:bg-white even:bg-blue-50 hover:bg-slate-100 transition-colors">
                    <td className="px-4 py-3 sm:px-6 font-medium text-gray-900 whitespace-nowrap">{aluno.nome_aluno}</td>
                    <td className="px-4 py-3 sm:px-6 hidden sm:table-cell">{aluno.RA_aluno}</td>
                    <td className="px-4 py-3 sm:px-6">{aluno?.percentual_frequencia}%</td>
                    <td className="px-4 py-3 sm:px-6 text-center">
                      <button 
                        onClick={() => togglePresence(aluno.ID_aluno)} 
                        className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer rounded-full border-2 transition-all duration-300 transform hover:scale-110 ${aluno.presente ? "bg-green-500 border-green-700" : "bg-red-500 border-red-700"}`} 
                        title={aluno.presente ? "Marcar como Ausente" : "Marcar como Presente"}
                        aria-label={`Marcar presença para ${aluno.nome_aluno}`}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gráfico de aulas dadas/total */}
          <div className="flex justify-center my-6">
            <GraficoPizza data={professorInfo} key={professorInfo?.aulas_dadas || 0} />
          </div>

          {/* Botão de confirmação de presença */}
          <div className="mt-4 flex justify-center sm:justify-end">
            <button 
              onClick={toggleConfirmModal} 
              disabled={botaoDesativado} 
              className={`w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform ${botaoDesativado ? "bg-gray-400 cursor-not-allowed" : "bg-[#1d577b] hover:bg-sky-700 hover:scale-105 active:scale-100 cursor-pointer"}`}
            >
              Confirmar Presença
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}