'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { jwtDecode } from "jwt-decode";

// Carrega o ApexCharts dinamicamente para evitar problemas de SSR no Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const backendUrl = `http://localhost:3001`;

/**
 * Componente de gráfico de pizza para presenças e faltas do aluno.
 * Busca dados do backend e exibe as porcentagens em gráfico.
 */
export default function GraficoPizza() {
  const [presencas, setPresencas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      buscarPresencas(storedToken, decoded);
    }
    window.scrollTo(0, 0);
  }, []);

  /**
   * Busca as presenças do aluno autenticado no backend.
   */
  const buscarPresencas = async (token, decoded) => {
    try {
      const payload = {
        idAluno: decoded?.idAluno,
      };

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
      } else {
        setErro(data.mensagem || "Erro ao enviar dados.");
      }
    } catch (error) {
      setErro("Erro na conexão com o servidor.");
    }
  };

  const labels = ['Faltas (%)', 'Presenças (%)'];

  const options = {
    chart: {
      type: 'pie',
      height: 420,
    },
    labels: labels, 
    colors: ['#054068', '#b6dffa'],
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toFixed(1)}%`;
        }
      }
    },
    states: {
      hover: {
        filter: {
          colors: ['#054068', '#b6dffa'],
          type: 'darck',
          value: 0.15,
        }
      }
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

  // Cálculo dos percentuais
  const faltas = presencas[0]?.total_faltas || 0;
  const total_aulas = presencas[0]?.total_aulas_turma || 0;
  const percentual_faltas = total_aulas ? ((faltas / total_aulas) * 100).toFixed(1) : 0;
  const percentual_presencas = total_aulas ? (100 - percentual_faltas).toFixed(1) : 0;
  const series = [parseFloat(percentual_faltas), parseFloat(percentual_presencas)];

  return (
    <div className="max-w-sm w-full bg-none rounded-lg  p-4 md:p-6 ">
      <h2 className="text-xl text-center font-bold text-sky-900 dark:text-white mb-4">Presenças</h2>
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