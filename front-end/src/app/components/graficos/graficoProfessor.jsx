'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { jwtDecode } from "jwt-decode";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;

export default function GraficoPizza() {
  const [presencas, setAlunos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      view(storedToken, decoded);
    }

    window.scrollTo(0, 0);
  }, []);

  const view = async (token, decoded) => {
    try {
      const response = await fetch(`${backendUrl}/presenca/viewP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
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
      } else {
        console.warn("A resposta da API não continha um array 'view' válido:", data);
        setAlunos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar presenças (ProfessorTable):", error);
      setAlunos([]);
    }
  };

  const labels = ['Faltas (%)', 'Presenças (%)'];

const options = {
  chart: {
    type: 'pie',
    height: 420,
  },
  labels: labels, 
  colors: ['#DC2626', '#16BDCA'],
  legend: {
    position: 'bottom',
    fontFamily: 'Inter, sans-serif',
  },
  dataLabels: {
    enabled: true,
    style: {
      fontFamily: 'Inter, sans-serif',
    },
    formatter: function (val) {
      return `${val.toFixed(1)}%`;
    },
  },
};

const alunos = presencas[0]?.total_alunos || 0;
const total_faltas = presencas[0]?.total_faltas_turma || 0;
const total_aulas = presencas[0]?.qntd_aula || 0;

let percentual_faltas = 0;
let percentual_presencas = 0;
let series = [];

if (alunos > 0 && total_aulas > 0) {
  percentual_faltas = ((total_faltas / (alunos * total_aulas)) * 100).toFixed(1);
  percentual_presencas = (100 - percentual_faltas).toFixed(1);
  series = [parseFloat(percentual_faltas), parseFloat(percentual_presencas)];
}




return (
  <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Presenças</h2>

    {erro ? (
      <p className="text-red-500">{erro}</p>
    ) : total_aulas === 0 ? ( 
      <p className="text-gray-400 dark:text-gray-300">Carregando dados...</p>
    ) : (
      <Chart 
        options={options} 
        series={series} 
        type="pie"  
        height={350} 
      />
    )}
  </div>
);

}
