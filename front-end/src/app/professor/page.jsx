"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import './prof.css';

import HeaderProfessor from '../components/HeaderProfessor/headerprof';
import Footer from '../components/Footer/page.jsx';
import GraficoPizza from '../components/graficos/graficoProfessor.jsx';

export default function ProfessorTable() {
  const searchParams = useSearchParams();
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [animado, setAnimado] = useState(false);
  const [profssor, setProfessorInfo] = useState(null);
  const [botaoDesativado, setBotaoDesativado] = useState(false);

  // --- NOVO ESTADO PARA CONTROLAR O MODAL DE CONFIRMAÇÃO ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const vindoDeRedirect = searchParams.get("redirect") === "true";
    if (vindoDeRedirect) {
      setMostrarMensagem(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("redirect");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const backendUrl = `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:3001`;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedData = jwtDecode(storedToken);
        setToken(storedToken);
        setDecoded(decodedData);
        view(storedToken, decodedData);
      } catch (error) {
        console.error("Erro ao decodificar o token (ProfessorTable):", error);
      }
    }
  }, []);

  const togglePresence = (alunoId) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) =>
        aluno.ID_aluno === alunoId
          ? { ...aluno, presente: !aluno.presente }
          : aluno
      )
    );
  };

  // --- FUNÇÃO PARA ABRIR/FECHAR O MODAL ---
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  // --- NOVA FUNÇÃO QUE CONTÉM A LÓGICA DE ENVIO (CHAMADA PELO MODAL) ---
  const handleConfirmAndSend = async () => {
    // 1. Fecha o modal de confirmação
    setShowConfirmModal(false);

    // 2. Bloqueia o botão principal e inicia a animação
    if (botaoDesativado) return;
    setBotaoDesativado(true);
    setAnimado(true);

    if (token && decoded && alunos.length > 0) {
      const alunosPresentes = alunos.filter((aluno) => aluno.presente);
      const alunosFaltantes = alunos.filter((aluno) => !aluno.presente);
      const requests = [];

      alunosPresentes.forEach(aluno => {
        requests.push(fetch(`${backendUrl}/presenca/registrar`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ materia: decoded?.materia, id: aluno.ID_aluno }),
        }));
      });

      alunosFaltantes.forEach(aluno => {
        requests.push(fetch(`${backendUrl}/presenca/marcarhistorico`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ID_professor: decoded?.ID_professor, ID_aluno: aluno.ID_aluno, materia: decoded?.materia }),
        }));
      });

      await Promise.all(requests).catch(err => console.error("Erro em uma das requisições de presença/falta:", err));

      try {
        const idAlunoReferencia = alunos[0].ID_aluno;
        await fetch(`${backendUrl}/presenca/aula`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ materia: decoded?.materia, idAluno: idAlunoReferencia }),
        });
      } catch (aulaError) {
        console.error("Erro ao marcar aula:", aulaError);
      }
      
      await view(token, decoded);

      // 3. Mostra a animação de "enviado" por um tempo e depois a esconde
      setTimeout(() => {
        setAnimado(false);
        // O botão continua desativado, conforme solicitado
      }, 1500);
    } else {
        // Se algo deu errado, reativa a interface
        setAnimado(false);
        setBotaoDesativado(false);
    }
  };

  const view = async (token, decoded) => {
    try {
      const response = await fetch(`${backendUrl}/presenca/viewP`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ turma: decoded?.turma_professor, materia: decoded?.materia }),
      });
      const data = await response.json();
      if (data && Array.isArray(data.view)) {
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

      {/* --- SEU NOVO MODAL DE CONFIRMAÇÃO --- */}
      {showConfirmModal && (
        <div
          id="confirm-presence-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center cursor-pointer"
                onClick={toggleConfirmModal} // Fecha o modal
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
                  Tem certeza que deseja enviar as presenças? <br/> Esta ação não poderá ser desfeita.
                </h3>
                <button
                  onClick={handleConfirmAndSend} // Chama a função de envio
                  type="button"
                  className="text-white bg-[#17577c] hover:bg-[#054068] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
                >
                  Sim, confirmar
                </button>
                <button
                  onClick={toggleConfirmModal} // Apenas fecha o modal
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 cursor-pointer"
                >
                  Não, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {animado && (
        <div className="slide-in-left bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Presenças enviadas!!</p>
          </div>
        </div>
      )}

      {mostrarMensagem && (
        <div className="slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Carregando <b>.</b><b>.</b><b>.</b></p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-6 relative overflow-hidden">
          {/* ... O resto do seu JSX da tabela e cabeçalho continua aqui ... */}
          <h1 className="font-bold text-gray-800 mb-6 border-b pb-4 text-xl sm:text-4xl">Painel da Presença</h1>
          {/* ... etc ... */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-base sm:px-6">
              Turma: <span className="font-semibold">{decoded?.turma_professor}</span>
            </div>
            <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-base sm:px-6">
              Quantidade de aulas: <span className="font-semibold">{profssor?.qntd_aula}</span>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-base sm:px-6">
              Aulas Marcadas: <span className="font-semibold">{profssor?.aulas_dadas}</span>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-base sm:px-6">
              Matéria: <span className="font-semibold">{decoded?.materia}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto rounded-xl overflow-hidden shadow-md">
                {/* ... conteúdo da tabela ... */}
                <thead>
                <tr className="bg-[#1d577b] text-white text-left text-sm sm:text-base">
                  <th className="py-4 px-6 font-semibold text-xs sm:text-sm">Nome</th>
                  <th className="py-4 px-6 font-semibold hidden sm:table-cell text-xs sm:text-sm">RA</th>
                  <th className="py-4 px-6 font-semibold text-xs sm:text-sm">Frequência</th>
                  <th className="py-4 px-6 font-semibold text-xs sm:text-sm">Presente</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.ID_aluno} className="odd:bg-white even:bg-blue-50 hover:bg-slate-200 transition-colors">
                    <td className="py-3 px-6 text-gray-700 text-xs sm:text-sm">{aluno.nome_aluno}</td>
                    <td className="py-3 px-6 text-gray-700 hidden sm:table-cell text-xs sm:text-sm">{aluno.RA_aluno}</td>
                    <td className="py-3 px-6 text-gray-700 text-xs sm:text-sm">{aluno?.percentual_frequencia}%</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => togglePresence(aluno.ID_aluno)}
                        className={`w-8 h-8 cursor-pointer rounded-full border-2 transition-colors duration-300 ${aluno.presente ? "bg-green-500 border-green-700" : "bg-red-500 border-red-700"}`}
                        title={aluno.presente ? "Presente" : "Ausente"}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center my-6">
            <GraficoPizza data={profssor} key={profssor?.aulas_dadas || 0} />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              // --- ONCLICK ALTERADO PARA ABRIR O MODAL ---
              onClick={toggleConfirmModal}
              disabled={botaoDesativado}
              className={`px-6 py-3 rounded-full font-bold text-white shadow-lg transition-transform transform ${
                botaoDesativado
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 hover:scale-105"
              }`}
            >
              Confirmar Presença
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}