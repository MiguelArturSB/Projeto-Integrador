

'use client'
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function GraficoPizza({ data }) {


  const options = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['Faltas (%)', 'Presenças (%)'],
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
          type: 'dark',
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


  const alunos = data?.total_alunos || 0;
  const total_faltas = data?.total_faltas_turma || 0;
  const total_aulas = data?.qntd_aula || 0;
  
  let percentual_faltas = 0;
  let percentual_presencas = 0;
  let series = [0, 100]; 
  
  const totalPossibilidades = alunos * total_aulas;
  
  if (alunos > 0 && total_aulas > 0 && totalPossibilidades > 0) {
    percentual_faltas = (total_faltas / totalPossibilidades) * 100;
    percentual_presencas = 100 - percentual_faltas;
  
 
    series = [parseFloat(percentual_faltas.toFixed(1)), parseFloat(percentual_presencas.toFixed(1))];
  }

  return (
    <div className="max-w-sm w-full bg-none rounded-lg p-4 md:p-6">
      <h2 className="text-xl text-center font-bold text-gray-900 dark:text-white mb-4">Média semestral</h2>

    
      {!data || total_aulas === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-300">Aguardando dados da chamada...</p>
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