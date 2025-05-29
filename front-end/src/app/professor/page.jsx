"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import './prof.css';
import HeaderProfessor from '../components/HeaderProfessor/headerprof';
import Footer from '../components/Footer/page.jsx'

export default function ProfessorTable() {
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [animado, setAnimado] = useState(false)




  const backendUrl = `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"
    }:3001`;

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
    setAnimado(true)

    
      const timeout = setTimeout(() => {
        router.push('../')
      }, 4200)




    if (token && decoded && alunos.length > 0) {
      const alunosPresentes = alunos.filter((aluno) => aluno.presente);

      if (alunosPresentes.length === 0) {
        console.warn("Nenhum aluno selecionado para registrar presença.");
        return;
      }

      let presencasRegistradasComSucesso = 0;
      let errosAoRegistrarPresenca = 0;
      let idAlunoParaMarcarAula = null;

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
            console.log(
              `Presença registrada para o aluno (ID: ${aluno.ID_aluno})`
            );
            if (!idAlunoParaMarcarAula) {
              idAlunoParaMarcarAula = aluno.ID_aluno;
            }
          } else {
            errosAoRegistrarPresenca++;
            const errorData = await response.json();
            console.error(
              `Erro ao registrar presença do aluno ${aluno.nome_aluno} (ID: ${aluno.ID_aluno}): ${response.status}`,
              errorData
            );
          }
        } catch (error) {
          errosAoRegistrarPresenca++;
          console.error(
            `Erro ao enviar requisição de presença para o aluno ${aluno.nome_aluno} (ID: ${aluno.ID_aluno}):`,
            error
          );
        }
      }


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

          if (aulaResponse.ok) {
            console.log(
              `Contador de aulas dadas para a matéria ${decoded?.materia} atualizado com sucesso.`
            );
          } else {
            const aulaErrorData = await aulaResponse.json();
            console.error(
              `Erro ao marcar aula para a matéria ${decoded?.materia} (usando aluno ID: ${idAlunoParaMarcarAula}): ${aulaResponse.status}`,
              aulaErrorData
            );
          }
        } catch (aulaError) {
          console.error(
            `Erro na requisição de marcar aula para a matéria ${decoded?.materia}:`,
            aulaError
          );
        }
      }


      if (presencasRegistradasComSucesso > 0) {
        console.log("Atualizando a lista de alunos...");
        view(token, decoded);
      } else if (errosAoRegistrarPresenca > 0 && presencasRegistradasComSucesso === 0) {
        console.warn("Nenhuma presença foi registrada com sucesso. A lista não será atualizada.");
      } else if (alunosPresentes.length > 0 && presencasRegistradasComSucesso === 0 && errosAoRegistrarPresenca === 0) {
        // Este caso não deveria acontecer se alunosPresentes.length > 0
        console.warn("Havia alunos selecionados, mas nenhuma presença foi processada.");
      }

    } else {
      console.warn("Token não encontrado, dados decodificados ausentes ou nenhum aluno na lista.");
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
          turmaProfessor: decoded?.turma_professor,
          turma: decoded?.turma_professor,
          materia: decoded?.materia,
        }),
      });

      const data = await response.json();

      if (data && Array.isArray(data.view)) {
        const alunosComPresencaInicial = data.view.map((aluno) => ({
          ...aluno,
          presente: false,
        }));
        setAlunos(alunosComPresencaInicial);
      } else {
        console.warn(
          "A resposta da API não continha um array 'view' válido:",
          data
        );
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
        <div className=" slide-in-left bg-sky-800 z-50 fixed w-[100%] h-[100vh]">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Presenças enviada!!</p>
          </div>
        </div>
      )}


      <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-6 relative overflow-hidden">
          <h1 className=" font-bold text-gray-800 mb-6 border-b pb-4 text-xl sm:text-4xl ">
            Painel da Presença
          </h1>

          <div className="flex  flex-row justify-between mb-6 gap-4 sm:flex-row ">
            <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner text-sm sm:text-xl sm:px-6 ">
              Turma:{" "}
              <span className="font-semibold">{decoded?.turma_professor}</span>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner  text-sm sm:text-xl  sm:px-6">
              Matéria: <span className="font-semibold">{decoded?.materia}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-[100%] table-fixed rounded-xl overflow-hidden shadow-md sm:min-w-full  sm:table-auto ">
              <thead>
                <tr className=" bg-[#1d577b] text-white text-left text-sm  sm:text-lg ">
                  <th className=" px-6   font-semibold text-[0.7rem] sm:text-sm">
                    Nome
                  </th>
                  <th className="py-4 px-6 font-semibold hidden sm:block text-xs sm:text-sm">
                    RA
                  </th>
                  <th className="py-4 px-6 font-semibold    text-[0.7rem] sm:text-sm">
                    Frequência
                  </th>
                  <th className="py-4 px-6 font-semibold  text-[0.7rem] sm:text-sm">
                    Presente
                  </th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr
                    key={aluno.ID_aluno}
                    className="odd:bg-white even:bg-blue-50 hover:bg-slate-200 transition-all"
                  >
                    <td className="py-1 px-6 text-gray-700 text-xs sm:text-sm sm:py-4">
                      {aluno.nome_aluno}
                    </td>
                    <td className="py-4 px-6 text-gray-700 hidden sm:block text-xs sm:text-sm">
                      {aluno.RA_aluno}
                    </td>
                    <td className="py-4 px-6 text-gray-700 text-xs sm:text-sm">
                      {aluno?.percentual_frequencia}%
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => togglePresence(aluno.ID_aluno)}
                        className={`w-8 h-8 cursor-pointer rounded-full border-5 transition-colors duration-300 ${aluno.presente
                          ? "bg-green-500 border-green-700"
                          : "bg-gray-400 border-gray-600"
                          }`}
                        title={aluno.presente ? "Presente" : "Ausente"}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className=" mt-[2%]   flex justify-end ">
            <button
              onClick={comfirmaPresenca}
              className="px-6 py-3 bg-sky-600   hover:bg-sky-700 text-white rounded-full font-bold shadow-lg transition-transform transform hover:scale-105"
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