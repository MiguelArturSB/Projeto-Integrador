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

  const [profssor, setProfessorInfo] = useState([]);

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

  const comfirmaPresenca = async () => {
    setAnimado(true);
    setTimeout(() => router.push('../?redirect=true'), 1950);

    if (token && decoded && alunos.length > 0) {
      const alunosPresentes = alunos.filter((aluno) => aluno.presente);
      const alunosFaltantes = alunos.filter((aluno) => !aluno.presente);

      let presencasRegistradasComSucesso = 0;
      let idAlunoParaMarcarAula = null;

      // Registrar presença
      for (const aluno of alunosPresentes) {
        try {
          const response = await fetch(`${backendUrl}/presenca/registrar`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              materia: decoded?.materia,
              id: aluno.ID_aluno,
            }),
          });

          if (response.ok) {
            presencasRegistradasComSucesso++;
            if (!idAlunoParaMarcarAula) {
              idAlunoParaMarcarAula = aluno.ID_aluno;
            }
          } else {
            const errorData = await response.json();
            console.error(`Erro ao registrar presença do aluno ${aluno.nome_aluno}:`, errorData);
          }
        } catch (error) {
          console.error(`Erro ao registrar presença de ${aluno.nome_aluno}:`, error);
        }
      }

      // Registrar faltas
      for (const aluno of alunosFaltantes) {
        try {
          const response = await fetch(`${backendUrl}/presenca/marcarhistorico`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ID_professor: decoded?.ID_professor,
              ID_aluno: aluno.ID_aluno,
              materia: decoded?.materia,
            }),
          });

          if (response.ok) {
            console.log(`Falta marcada para o aluno ${aluno.nome_aluno}`);
          } else {
            const errorData = await response.json();
            console.error(`Erro ao marcar falta do aluno ${aluno.nome_aluno}:`, errorData);
          }
        } catch (err) {
          console.error(`Erro ao registrar falta de ${aluno.nome_aluno}:`, err);
        }
      }

      // Marcar aula
      if (presencasRegistradasComSucesso > 0 && idAlunoParaMarcarAula) {
        try {
          const aulaResponse = await fetch(`${backendUrl}/presenca/aula`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              materia: decoded?.materia,
              idAluno: idAlunoParaMarcarAula,
            }),
          });

          if (!aulaResponse.ok) {
            const aulaErrorData = await aulaResponse.json();
            console.error(`Erro ao marcar aula:`, aulaErrorData);
          }
        } catch (aulaError) {
          console.error("Erro ao marcar aula:", aulaError);
        }
      }
    } else {
      console.warn("Token não encontrado ou lista de alunos vazia.");
    }
  };

  const view = async (token, decoded) => {
    try {
      const response = await fetch(`${backendUrl}/presenca/viewP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // turmaProfessor: decoded?.turma_professor,
          turma: decoded?.turma_professor,
          materia: decoded?.materia,
        }),
      });

      const data = await response.json();

      if (data && Array.isArray(data.view)) {
        const alunosComPresencaInicial = data.view.map((aluno) => ({
          ...aluno,
          presente: true,
        }));

        setAlunos(alunosComPresencaInicial);
        setProfessorInfo(data.view[0]); 
      

        
        console.log('eita',alunosComPresencaInicial)
      } else {
        console.warn("A resposta da API não continha um array 'view' válido:", data);
        setAlunos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar presenças (ProfessorTable):", error);
      setAlunos([]);
    }
  };

  return (
    <>
      <HeaderProfessor />
      {animado && (
        <div className="slide-in-left bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Presenças enviada!!</p>
          </div>
        </div>
      )}

      {mostrarMensagem && (
        <div className=" slide-in-volta bg-sky-800 z-[9999] fixed inset-0 w-full h-full">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Carregando <b className='ponto1'>.</b> <b className='ponto2'>.</b> <b className='ponto3'>.</b> </p>
          </div>
        </div>
      )}


            



      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-6 relative overflow-hidden">
          <h1 className=" font-bold text-gray-800 mb-6 border-b pb-4 text-xl sm:text-4xl ">
            Painel da Presença
          </h1>

          <div className="flex flex-row justify-between mb-6 gap-4 sm:flex-row ">
            <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-xl sm:px-6 ">
              Turma: <span className="font-semibold">{decoded?.turma_professor}</span>
            </div>

            <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-xl sm:px-6 ">
              Quantidade de aulas: <span className="font-semibold">{profssor?.qntd_aula}</span>
            </div>

            <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-xl sm:px-6">
              Aulas Marcadas: <span className="font-semibold">{profssor?.aulas_dadas}</span>
            </div>

            <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-xl sm:px-6">
              Matéria: <span className="font-semibold">{decoded?.materia}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-[100%] table-fixed rounded-xl overflow-hidden shadow-md sm:min-w-full sm:table-auto ">
              <thead>
                <tr className=" bg-[#1d577b] text-white text-left text-sm sm:text-lg ">
                  <th className=" px-6 font-semibold text-[0.7rem] sm:text-sm">Nome</th>
                  <th className="py-4 px-6 font-semibold hidden sm:block text-xs sm:text-sm">RA</th>
                  <th className="py-4 px-6 font-semibold text-[0.7rem] sm:text-sm">Frequência</th>
                  <th className="py-4 px-6 font-semibold text-[0.7rem] sm:text-sm">Presente</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.ID_aluno} className="odd:bg-white even:bg-blue-50 hover:bg-slate-200 transition-all">
                    <td className="py-1 px-6 text-gray-700 text-xs sm:text-sm sm:py-4">{aluno.nome_aluno}</td>
                    <td className="py-4 px-6 text-gray-700 hidden sm:block text-xs sm:text-sm">{aluno.RA_aluno}</td>
                    <td className="py-4 px-6 text-gray-700 text-xs sm:text-sm">{aluno?.percentual_frequencia}%</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => togglePresence(aluno.ID_aluno)}
                        className={`w-8 h-8 cursor-pointer rounded-full border-5 transition-colors duration-300 ${aluno.presente ? "bg-green-500 border-green-700" : "bg-red-500 border-red-700"}`}
                        title={aluno.presente ? "Presente" : "Ausente"}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


            {/* <div className="flex justify-center"> */}
              <div className="flex justify-center my-6">
                <GraficoPizza />
              </div>
                  <div className=" mt-[2%] flex justify-end ">
                    <button
                      onClick={comfirmaPresenca}
                      className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-bold shadow-lg transition-transform transform hover:scale-105"
                      >
                      Confirmar Presença
                    </button>
                  </div>
            {/* </div> */}
      </div>

        </div>
      <Footer />
    </>
  );
}
